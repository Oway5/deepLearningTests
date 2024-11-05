import json
import matplotlib.pyplot as plt

# Load the vote distribution data from the file
with open('./dataFound/two.txt', 'r') as file:
    vote_counts = json.load(file)

# Convert keys and values to lists for plotting
votes = list(map(int, vote_counts.keys()))  # Convert vote counts to integers
frequencies = list(vote_counts.values())

# Plot the distribution
plt.figure(figsize=(10, 6))
plt.bar(votes, frequencies, width=1.0, edgecolor='black')
plt.xlabel('Votes')
plt.ylabel('Frequency')
plt.title('Distribution of Votes per Entry')
# You can use 'linear', 'log', 'symlog', 'logit' scales for the y-axis
# Here are examples of each:

# Linear scale (default)
# plt.yscale('linear')

# Logarithmic scale
plt.yscale('log')

# Symmetrical log scale
# plt.yscale('symlog')
plt.ylim(1, 3000)  # Adjust the range as needed

# Logit scale
# plt.yscale('logit')
plt.show()
