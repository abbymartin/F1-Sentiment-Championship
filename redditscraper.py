import praw
from praw.models import MoreComments
import json

reddit = praw.Reddit(
    # client ID and secrets
)

subreddit = reddit.subreddit("formula1")
terms = [
    "Lewis", "Hamilton", "LH44",
    "Max", "Verstappen", "MV33",
    "Valtteri", "Bottas", "VB77",
    "Charles", "Leclerc", "CL16",
    "Daniel", "Ricciardo", "DR3",
    "Lando", "Norris", "LN4",
    "Carlos", "Sainz", "CS55",
    "Sergio", "Perez", "SP11",
    "Fernando", "Alonso", "FA14",
    "Esteban", "Ocon", "EO31",
    "Pierre", "Gasly", "PG10",
    "Yuki", "Tsunoda", "YT22",
    "Oscar", "Piastri", "OP81",
    "Zhou", "Guanyu", "ZG24",
    "Logan", "Sargeant", "LS2",
    "Alex", "Albon", "AA23",
    "George", "Russell", "GR63",
    "Kevin", "Magnussen", "KM20",
    "Nico", "Hulkenberg", "NH27",
    "Lance", "Stroll", "LS18",
    "Mercedes", "Toto", "Merc",
    "Redbull", "Christian", "Horner", "RBR",
    "Ferrari", "Frédéric", "Vasseur",
    "McLaren", "Zak", 
    "AstonMartin", "Krack",
    "Alpine", "Laurent", "Rossi", 
    "Stake", "Andreas", "Seidl", 
    "AlphaTauri", "Franz", "VCARB",
    "Williams", "James", "Vowels", 
    "Haas", "Ayao", "Komatsu"
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
    "Alex" : [],
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
    "James" : [],  
    "Haas" : [], 
    "Ayao" : []
}

#print(comments)

for term in terms:
    for post in subreddit.search(term, sort="top", time_filter="year", limit=5):
        if post.num_comments > 100:
            for comment in post.comments:
                if isinstance(comment, MoreComments) or comment.body == "[deleted]":
                    continue
                # Check if the comment mentions any drivers
                for driver in comments.keys():
                    if driver in comment.body or driver.lower() in comment.body.lower():
                        comments[driver].append(comment.body)

result = {}

for key,value in comments.items():
    if value not in result.values():
        result[key] = value

# Save comments to a JSON file
with open("comments.json", "w") as outfile:
    json.dump(result, outfile, indent=4)

print("Comments sorted and saved to comments.json")