import json
import matplotlib.pyplot as plt

# Load the vote distribution data from the file
with open('./dataFound/two.txt', 'r') as file:
    vote_counts = json.load(file)

# Convert keys and values to lists and sort by votes for cumulative sum
votes = sorted(map(int, vote_counts.keys()))  # Sorted list of vote counts
frequencies = [vote_counts[str(vote)] for vote in votes]  # Frequencies corresponding to sorted votes

# Calculate cumulative frequencies
cumulative_frequencies = []
cumulative_sum = 0
for frequency in frequencies:
    cumulative_sum += frequency
    cumulative_frequencies.append(cumulative_sum)

# Plot the cumulative distribution
plt.figure(figsize=(10, 6))
plt.bar(votes, cumulative_frequencies, width=1.0, edgecolor='black')
plt.xlabel('Votes')
plt.ylabel('Cumulative Frequency')
plt.title('Cumulative Distribution of Votes per Entry')
plt.yscale('log')  # Optional: Use log scale if there are large frequency differences
plt.show()
