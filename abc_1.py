import json
import random

# Define possible values
names = ["John Doe", "Alice Johnson", "Bob Brown", "Jane Smith", "Charlie Davis"]
countries = ["UK", "Japan", "Australia", "Canada", "USA"]
sports = ["Athletics", "Gymnastics", "Tennis", "Basketball", "Swimming"]
genders = ["Male", "Female"]

# Function to generate a random player record
def generate_player(player_id):
    return {
        "PlayerID": f"P{player_id:03d}",
        "Name": random.choice(names),
        "Country": random.choice(countries),
        "Sport": random.choice(sports),
        "Age": random.randint(18, 35),
        "Gender": random.choice(genders)
    }

# Generate 500 player records
players = [generate_player(i + 1) for i in range(500)]

# Create the JSON data structure
data = {"Players": players}

# Write to JSON file
with open("olympics_database_500.json", "w") as file:
    json.dump(data, file, indent=4)

print("JSON file 'olympics_database_500.json' created successfully.")
