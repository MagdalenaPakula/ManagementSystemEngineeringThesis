import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from itertools import combinations, islice
from flask import Flask, render_template, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

CORS(app, resources={r"/*": {"origins": "http://localhost:4200"}})


# Load the input data and new data
df = pd.read_csv('data/input.csv')
new_data = pd.read_csv('new_file.csv')

# Extract features (X) and target (y)
X = df.iloc[:, 5:]  # Using columns from 'Calories' onwards as features
y = df[['Food_items', 'Breakfast', 'Lunch', 'Dinner', 'VegNovVeg']]

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the decision tree classifier
clf = DecisionTreeClassifier()
clf.fit(X_train, y_train['Breakfast'])  # Assuming 'Breakfast' is the target variable

# Define a route for the home page
@app.route('/')
def home():
    return render_template('index.html')

# Define a route to handle the form submission
@app.route('/submit', methods=['POST'])
def submit():
    # Get user input from the form
    age = float(request.form['age'])
    weight = float(request.form['weight'])
    height = float(request.form['height'])
    gender = request.form['gender'].upper()
    activity_level = request.form['activity_level'].lower()
    goal = request.form['goal'].lower()
    num_meals = int(request.form['num_meals'])

    # Calculate BMR based on gender
    if gender == 'M':
        bmr = 10 * weight + 6.25 * height - 5 * age + 5
    elif gender == 'F':
        bmr = 10 * weight + 6.25 * height - 5 * age - 161
    else:
        return render_template('error.html', message="Invalid gender input. Please enter 'M' or 'F'")

    # Calculate Total Daily Calorie needs based on activity factor
    if activity_level == 'sedentary':
        calorie_calculation = bmr * 1.2
    elif activity_level == 'lightly active':
        calorie_calculation = bmr * 1.375
    elif activity_level == 'moderately active':
        calorie_calculation = bmr * 1.55
    elif activity_level == 'very active':
        calorie_calculation = bmr * 1.725
    elif activity_level == 'extra active':
        calorie_calculation = bmr * 1.9
    else:
        return render_template('error.html', message="Invalid activity level input. Please choose from the provided options.")

    # Adjust the calorie distribution based on the number of meals
    if num_meals == 3:
        breakfast_percentage = 0.35
        lunch_percentage = 0.40
        dinner_percentage = 0.25
        morning_snack_percentage = 0.0
        afternoon_snack_percentage = 0.0
    elif num_meals == 4:
        breakfast_percentage = 0.25
        morning_snack_percentage = 0.10
        lunch_percentage = 0.35
        dinner_percentage = 0.30
        afternoon_snack_percentage = 0.0
    elif num_meals == 5:
        breakfast_percentage = 0.25
        morning_snack_percentage = 0.10
        lunch_percentage = 0.30
        afternoon_snack_percentage = 0.10
        dinner_percentage = 0.25
    else:
        return render_template('error.html', message="Invalid number of meals input. Please choose 3, 4, or 5.")

    # # Calculate the calories for each meal based on the percentage
    # breakfast_calories = calorie_calculation * breakfast_percentage
    # lunch_calories = calorie_calculation * lunch_percentage
    # dinner_calories = calorie_calculation * dinner_percentage

    # Define afternoon_snack_percentage for 5 meals
    if num_meals == 5:
        afternoon_snack_percentage = 0.10

    # Generate meal suggestions based on the goal
    if goal == 'lose weight':
        calorie_threshold = calorie_calculation - 500  # Adjust as needed for weight loss
    elif goal == 'gain weight':
        calorie_threshold = calorie_calculation + 500  # Adjust as needed for weight gain
    else:
        calorie_threshold = calorie_calculation

    # Filter recipes based on calorie threshold
    valid_recipes = new_data[new_data['Calories'] <= calorie_threshold]

    # Sample a smaller subset of recipes
    sample_size = 100  # Adjust the size as needed
    valid_recipes = valid_recipes.sample(n=sample_size)

    # Calculate BMI
    bmi = weight / ((height / 100) ** 2)

    # Print BMI
    app.logger.info(f"\nYour body mass index is: {bmi:.2f}")

    # Print weight category based on BMI
    if bmi < 16:
        app.logger.info("severely underweight")
        clbmi = 4
    elif 16 <= bmi < 18.5:
        app.logger.info("underweight")
        clbmi = 3
    elif 18.5 <= bmi < 25:
        app.logger.info("Healthy")
        clbmi = 2
    elif 25 <= bmi < 30:
        app.logger.info("overweight")
        clbmi = 1
    elif bmi >= 30:
        app.logger.info("severely overweight")
        clbmi = 0

    # Print daily calorie needs
    app.logger.info(f"\nTotal Daily Calorie Needs: {calorie_calculation:.2f}")

    # Find the best combinations for each meal
    best_combinations = []
    meal_percentages = [('Breakfast', breakfast_percentage), ('Morning Snack', morning_snack_percentage),
                        ('Lunch', lunch_percentage), ('Dinner', dinner_percentage), ('Afternoon Snack', afternoon_snack_percentage)]

    for meal, percentage in meal_percentages[:num_meals]:  # Limit to the selected number of meals
        app.logger.info(f"\nSuggestions for {meal}:")

        # Limit the number of combinations
        max_combinations = 1000  # Adjust the number as needed
        all_combinations = list(islice(combinations(valid_recipes.index, 3), max_combinations))

        # Sort combinations based on how close they are to the calorie threshold
        sorted_combinations = sorted(all_combinations, key=lambda combo: abs(
            valid_recipes.loc[list(combo), 'Calories'].sum() - calorie_calculation * percentage))

        # Take the top combination
        best_combination = sorted_combinations[0]

        # Print the meal names and total calories for the best combination
        meal_names = valid_recipes.loc[list(best_combination), 'Name'].tolist()
        total_calories = valid_recipes.loc[list(best_combination), 'Calories'].sum()
        app.logger.info(f"Combination: {meal_names}, Total Calories: {total_calories:.2f}")

        # Append the combination to the best_combinations list
        best_combinations.append({'meal': meal, 'combination': meal_names, 'total_calories': total_calories})

    # Example: Render a result template
    return render_template('result.html', bmi=bmi, calorie_calculation=calorie_calculation,
                           best_combinations=best_combinations)

if __name__ == '__main__':
    app.run(debug=True)