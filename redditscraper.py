import praw
from praw.models import MoreComments
import json

reddit = praw.Reddit(

)

subreddit = reddit.subreddit("formula1")

terms = [
    "Lewis",
    "Hamilton",
    "Max",
    "Verstappen",
    "Valtteri",
    "Bottas", 
    "Charles",
    "Leclerc", 
    "Daniel", 
    "Ricciardo",
    "Lando",
    "Norris", 
    "Carlos",
    "Sainz", 
    "Sergio",
    "Perez", 
    "Fernando",
    "Alonso", 
    "Esteban",
    "Ocon", 
    "Pierre",
    "Gasly", 
    "Yuki",
    "Tsunoda", 
    "Oscar",
    "Piastri",
    "Zhou", 
    "Guanyu",
    "Logan", 
    "Sargeant",
    "Alex", 
    "Albon",
    "George",
    "Russell", 
    "Kevin", 
    "Magnussen",
    "Nico", 
    "Hulkenberg",
    "Lance",
    "Stroll",
    "Race Discussion"
]

comments = {term: [] for term in terms[:-1]}
print(comments)

for term in terms:
    for post in subreddit.search(term, sort="top", time_filter="year", limit=25):
        if post.num_comments > 100:
            counter = 0
            for comment in post.comments:
                if counter >= 1000:
                    break
                counter += 1
                if isinstance(comment, MoreComments) or comment.body == "[deleted]":
                    continue
                # Check if the comment mentions any drivers
                for driver in comments.keys():
                    if driver in comment.body or driver.lower() in comment.body.lower():
                        comments[driver].append([comment.body, comment.created_utc, comment.score, comment.link_id])


result = {}

for key,value in comments.items():
    if value not in result.values():
        result[key] = value

# Save comments to a JSON file
with open("comments.json", "w") as outfile:
    json.dump(result, outfile, indent=4)

print("Comments sorted and saved to comments.json")