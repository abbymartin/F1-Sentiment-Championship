import praw
from praw.models import MoreComments

reddit = praw.Reddit(
    client_id="",
    client_secret="",
    password="",
    user_agent="",
    username="",
)


subreddit = reddit.subreddit("formula1")
terms = ["Lewis", "Hamilton", "LH44", "Mercedes", "RedBull", "Max", "Verstappen", "MV33"]

posts = []
titles = []
comments = []

for term in terms:
    for post in subreddit.search(term, sort="hot", limit=5):
        if(post.num_comments > 100):
            posts.append(post)
            titles.append(post.title)
            comments.append(post.comments)

#print(titles)
#print(comments)
#print(posts)
for post in posts:
    for comment in post.comments:
        if isinstance(comment, MoreComments) or comment.body == "[deleted]":
            continue
        print(comment.body)