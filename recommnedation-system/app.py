import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from itertools import combinations, islice
from flask import Flask, render_template, request, jsonify
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
@app.route('/submit', methods=['POST', 'OPTIONS'])
def submit():
    try:
        form_data = request.form.to_dict()
        app.logger.info(f"Received form data: {form_data}")

        # Check for missing keys
        required_keys = ['age', 'weight', 'height', 'gender', 'activity_level', 'goal', 'num_meals']
        if any(key not in form_data for key in required_keys):
            return jsonify({'error': 'Missing one or more required keys'})

        # Get user input from the form
        age = float(form_data['age'])
        weight = float(form_data['weight'])
        height = float(form_data['height'])
        gender = form_data['gender'].upper()
        activity_level = form_data['activity_level'].lower()
        goal = form_data['goal'].lower()
        num_meals = int(form_data['num_meals'])

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
        elif activity_level == 'lightly_active':
            calorie_calculation = bmr * 1.375
        elif activity_level == 'moderately_active':
            calorie_calculation = bmr * 1.55
        elif activity_level == 'moderately_active':
            calorie_calculation = bmr * 1.725
        elif activity_level == 'extra_active':
            calorie_calculation = bmr * 1.9
        else:
            print("Invalid activity level input. Please choose from the provided options.")
            exit()

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
            print("Invalid number of meals input. Please choose 3, 4, or 5.")
            exit()

        # Calculate the calories for each meal based on the percentage
        breakfast_calories = calorie_calculation * breakfast_percentage
        lunch_calories = calorie_calculation * lunch_percentage
        dinner_calories = calorie_calculation * dinner_percentage

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
        sample_size = 200  # Adjust the size as needed
        valid_recipes = valid_recipes.sample(n=sample_size)

        # Calculate BMI
        bmi = weight / ((height / 100) ** 2)

        # Print BMI
        app.logger.info(f"\nYour body mass index is: {bmi:.2f}")

        # Print weight category based on BMI
        bmi_categories = {4: "severely underweight", 3: "underweight", 2: "Healthy", 1: "overweight",
                          0: "severely overweight"}
        if bmi < 16:
            app.logger.info(bmi_categories[4])
            clbmi = 4
        elif 16 <= bmi < 18.5:
            app.logger.info(bmi_categories[3])
            clbmi = 3
        elif 18.5 <= bmi < 25:
            app.logger.info(bmi_categories[2])
            clbmi = 2
        elif 25 <= bmi < 30:
            app.logger.info(bmi_categories[1])
            clbmi = 1
        elif bmi >= 30:
            app.logger.info(bmi_categories[0])
            clbmi = 0

        # Print daily calorie needs
        app.logger.info(f"\nTotal Daily Calorie Needs: {calorie_calculation:.2f}")

        # Find the best combinations for each meal
        best_combinations = []
        meal_percentages = [('Breakfast', breakfast_percentage), ('Morning Snack', morning_snack_percentage),
                            ('Lunch', lunch_percentage), ('Dinner', dinner_percentage),
                            ('Afternoon Snack', afternoon_snack_percentage)]

        for meal, percentage in meal_percentages[:num_meals]:  # Limit to the selected number of meals
            print(f"\nSuggestions for {meal}:")

            # Limit the number of combinations
            max_combinations = 1000  # Adjust the number as needed
            all_combinations = list(islice(combinations(valid_recipes.index, 3), max_combinations))

            # Sort combinations based on how close they are to the calorie threshold
            sorted_combinations = sorted(all_combinations, key=lambda combo: abs(
                valid_recipes.loc[list(combo), 'Calories'].sum() - calorie_calculation * percentage))

            # Take the top combination
            best_combination = sorted_combinations[0]

            # Fetch RecipeCategory for each recipe in the combination
            categories = valid_recipes.loc[list(best_combination), 'RecipeCategory'].tolist()

            # Print the meal names, categories, and total calories for the best combination
            meal_names = valid_recipes.loc[list(best_combination), 'Name'].tolist()
            total_calories = valid_recipes.loc[list(best_combination), 'Calories'].sum()

            print(f"Combination: {meal_names}, Categories: {categories}, Total Calories: {total_calories:.2f}")

            # Append the combination with categories to the best_combinations list
            best_combinations.append(
                {'meal': meal, 'combination': meal_names, 'categories': categories, 'total_calories': total_calories})

        #  Flask routes to return JSON responses instead of rendering HTML templates. This is because Angular will communicate with the backend using HTTP requests.
        return jsonify({
            'bmi': round(bmi, 2),
            'calorie_calculation': round(calorie_calculation, 2),
            'best_combinations': [
                {
                    'meal': entry['meal'],
                    'combination': entry['combination'],
                    'categories': entry['categories'],
                    'total_calories': round(entry['total_calories'], 2)
                }
                for entry in best_combinations
            ]
        })
    except KeyError as e:
        return jsonify({'error': f'Missing key: {e.args[0]}'})


if __name__ == '__main__':
    app.run(debug=True)
