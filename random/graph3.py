import json
import matplotlib.pyplot as plt

# Load the vote distribution data from the file
with open('./dataFound/two.txt', 'r') as file:
    vote_counts = json.load(file)

# Convert keys and values to lists and sort by votes
votes = sorted(map(int, vote_counts.keys()))  # Sorted list of vote counts
frequencies = [vote_counts[str(vote)] for vote in votes]  # Frequencies corresponding to sorted votes

# Separate data for votes <= 50 and sum everything over 50
votes_filtered = []
frequencies_filtered = []
over_50_sum = 0

for vote, frequency in zip(votes, frequencies):
    if vote <= 50:
        votes_filtered.append(vote)
        frequencies_filtered.append(frequency)
    else:
        over_50_sum += frequency

# Add a single entry for "over 50" votes
votes_filtered.append(51)  # Using 51 to represent "over 50"
frequencies_filtered.append(over_50_sum)
print(over_50_sum)
