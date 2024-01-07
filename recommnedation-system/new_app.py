import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from itertools import combinations, islice

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

# Make predictions on the test set
y_pred = clf.predict(X_test)

# Get user input for BMI calculation
age = float(input("Enter your age: "))
weight = float(input("Enter your weight in kg: "))
height = float(input("Enter your height in cm: "))
gender = input("Enter your gender (M/F): ").upper()

# Calculate BMR based on gender
if gender == 'M':
    bmr = 10 * weight + 6.25 * height - 5 * age + 5
elif gender == 'F':
    bmr = 10 * weight + 6.25 * height - 5 * age - 161
else:
    print("Invalid gender input. Please enter 'M' or 'F'")
    exit()

# Get user input for activity level
activity_level = input(
    "Enter your activity level (sedentary/lightly active/moderately active/very active/extra active): ").lower()

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
    print("Invalid activity level input. Please choose from the provided options.")
    exit()

# Get user input for weight goal
goal = input("Do you want to lose weight, gain weight, or maintain your current weight? ").lower()

# Get user input for the number of meals per day
num_meals = int(input("Enter the number of meals per day (3, 4, or 5): "))

# Calculate BMI
bmi = weight / ((height / 100) ** 2)

# Print BMI
print(f"\nYour body mass index is: {bmi:.2f}")

# Print weight category based on BMI
if bmi < 16:
    print("severely underweight")
    clbmi = 4
elif 16 <= bmi < 18.5:
    print("underweight")
    clbmi = 3
elif 18.5 <= bmi < 25:
    print("Healthy")
    clbmi = 2
elif 25 <= bmi < 30:
    print("overweight")
    clbmi = 1
elif bmi >= 30:
    print("severely overweight")
    clbmi = 0

# Print daily calorie needs
print(f"\nTotal Daily Calorie Needs: {calorie_calculation:.2f} calories")

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
    print("Invalid number of meals input. Please choose 3, 4, or 5.")
    exit()

# Calculate the calories for each meal based on the percentage
breakfast_calories = calorie_calculation * breakfast_percentage
lunch_calories = calorie_calculation * lunch_percentage
dinner_calories = calorie_calculation * dinner_percentage

# Generate meal suggestions based on the goal
if goal == 'lose weight':
    meal_suggestions = df[df['VegNovVeg'] == 1]  # Example: Only suggest vegetarian meals for weight loss
    calorie_threshold = calorie_calculation - 500  # Adjust as needed for weight loss
elif goal == 'gain weight':
    meal_suggestions = df[df['VegNovVeg'] == 0]  # Example: Only suggest non-vegetarian meals for weight gain
    calorie_threshold = calorie_calculation + 500  # Adjust as needed for weight gain
else:
    meal_suggestions = df  # Suggest meals without any filtering for weight maintenance
    calorie_threshold = calorie_calculation

# Filter recipes based on calorie threshold
valid_recipes = new_data[new_data['Calories'] <= calorie_threshold]

# Sample a smaller subset of recipes
sample_size = 100  # Adjust the size as needed
valid_recipes = valid_recipes.sample(n=sample_size)

# Find the best combinations for each meal
best_combinations = []
meal_percentages = [('Breakfast', breakfast_percentage), ('Morning Snack', morning_snack_percentage),
                    ('Lunch', lunch_percentage), ('Dinner', dinner_percentage), ('Afternoon Snack', afternoon_snack_percentage)]

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

    # Print the meal names and total calories for the best combination
    meal_names = valid_recipes.loc[list(best_combination), 'Name'].tolist()
    total_calories = valid_recipes.loc[list(best_combination), 'Calories'].sum()
    print(f"Combination: {meal_names}, Total Calories: {total_calories:.2f}")

    # Append the combination to the best_combinations list
    best_combinations.append({'meal': meal, 'combination': meal_names, 'total_calories': total_calories})



