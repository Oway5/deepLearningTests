# Current Notes
## Nov 5, 4:00
From some data manipulation, I think setting the minimum sponsor vote threshold to 50 would be a good idea.
We could expand later based on how training goes. With a dataset min of 50 votes we still have to scrape about **11,000** unique videos. Now we need to figure out how to do that...
For our initial *test* we should probably raise the bar to something super high just to ensure a perfect sponsor detection scenario. 

All the paths in the /random folder are WRONG and have not been updated. Make sure you add ../ to whatever is using a relative path 
---

**SponsorTimes spreadsheet has these Headers** 
videoID	
startTime	
endTime	
votes
locked	
incorrectVotes	
UUID	
userID	
timeSubmitted	
views	
category	
actionType	
service	
videoDuration	
hidden	
reputation	
shadowHidden	
hashedVideoID	
userAgent	
description

---

## Todo
- [x] Find how many files I actually wanna scrape
    - 11164
- [x] Find the Avg length of a sponsor segment within the ones we wanna scrape
    - 40.03s
- [ ] How many of them are also in english
    - Have to scrape first
- [ ] Make a list of all those that are the median among english (grab ids)
    - can't do this until after scraping 
- [x] convert ids into urls and put that into a txt or multiple txt files
    - https://www.youtube.com/watch?v={id}
- [ ] Script the APIfy worker WITH PROXIES to go through that list 
- [ ] Download in an organized way
- [ ] Clean and manipualte to ensure it can be trained on 
- [ ] Train