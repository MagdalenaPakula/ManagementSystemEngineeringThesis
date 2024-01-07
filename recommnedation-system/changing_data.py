import pandas as pd

# Try reading the CSV file with automatic separator inference
try:
    df = pd.read_csv('data/recipes.csv')
except pd.errors.ParserError:
    # If automatic inference fails, specify the separator manually
    df = pd.read_csv('data/recipes.csv', sep=',')

# Select the desired columns
selected_columns = ['RecipeId', 'Name', 'RecipeCategory', 'Calories']
df_selected = df[selected_columns]

# Save the new DataFrame to a new CSV file
df_selected.to_csv('new_file.csv', index=False)
