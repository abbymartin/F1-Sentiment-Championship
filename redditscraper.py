import praw
from praw.models import MoreComments
import json

reddit = praw.Reddit(
    client_id="uPCgF409UGD24DOhuTolFA",
    client_secret="QekIVpdFWDJAoAdRP3ANLoW__-JH2w",
    password="FWL32tz*",
    user_agent="prawluvr77",
    username="prawluvr77",
)

subreddit = reddit.subreddit("formula1")

terms = [
    "Lewis",
    "Max",
    "Bottas", 
    "Charles", 
    "Daniel", 
    "Lando", 
    "Carlos", 
    "Sergio", 
    "Fernando", 
    "Esteban", 
    "Pierre", 
    "Yuki", 
    "Oscar",
    "Zhou", 
    "Logan", 
    "Alex", 
    "George", 
    "Kevin", 
    "Nico", 
    "Lance",
    "Race Discussion"
]

comments = {
    "Lewis" : [],
    "Max" : [],
    "Bottas" : [],
    "Valterri" : [],
    "Charles" : [],
    "Daniel" : [],
    "Lando" : [],
    "Carlos" : [],
    "Perez"  : [],
    "Alonso" : [],
    "Ocon" : [],
    "Pierre" : [],
    "Yuki" : [],
    "Oscar" : [],
    "Zhou" : [],
    "Logan" : [],
    "Albon" : [],
    "George" : [],
    "Kevin" : [],
    "Hulkenberg" : [],
    "Lance" : [],
    "Mercedes" : [], 
    "Toto" : [],
    "Redbull" : [],
    "Horner"  : [],
    "Ferrari"  : [], 
    "Vasseur"  : [],
    "McLaren" : [], 
    "Zak" : [], 
    "Aston Martin" : [], 
    "Krack" : [],
    "Alpine" : [], 
    "Rossi" : [], 
    "Stake" : [], 
    "Andreas" : [],  
    "AlphaTauri" : [], 
    "Franz" : [], 
    "VCARB" : [],
    "Williams" : [],
    "Alfa Romeo" : [], 
    "James" : [],  
    "Haas" : [], 
    "Ayao" : []
}

#print(comments)

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