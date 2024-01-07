import pandas as pd

try:
    # Read the CSV file with specified encoding and delimiter, skipping errors
    df = pd.read_csv('data/recipes.csv', sep='\t', encoding='utf-8', error_bad_lines=False)


    # Function to determine the category based on keywords
    def determine_category(row):
        if 'breakfast' in row.lower():
            return 'Breakfast'
        elif 'lunch' in row.lower() or 'soup' in row.lower() or 'chicken' in row.lower() or 'vegetable' in row.lower():
            return 'Lunch'
        elif 'dinner' in row.lower() or 'chicken' in row.lower() or 'vegetable' in row.lower():
            return 'Dinner'
        elif 'dessert' in row.lower() or 'pie' in row.lower():
            return 'Afternoon Snack' if 'morning snack' not in row.lower() else 'Morning Snack'
        elif 'beverage' in row.lower():
            return 'Afternoon Snack' if 'morning snack' not in row.lower() else 'Morning Snack'
        else:
            return 'null'

    # Keep only the desired columns
    selected_columns = ['RecipeId', 'Name', 'Calories', 'new_category']
    df = df[selected_columns]

    # Save the changes to a new file
    df.to_csv('data/updated_recipes.csv', index=False, sep='\t')

except pd.errors.ParserError as e:
    print(f"Error parsing the CSV file: {e}")

except KeyError as e:
    print(f"Error selecting columns: {e}")
