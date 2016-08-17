import os
import re
import time
import tweepy

auth = tweepy.OAuthHandler(os.environ['twitter_consumer_key'], os.environ['twitter_consumer_secret'])
auth.set_access_token(os.environ['twitter_access_token'], os.environ['twitter_access_token_secret'])

api = tweepy.API(auth)

seen = set()

for page in range(200):
    time.sleep(10)
    for tweet in api.search('"Why do you"', rpp=100):
        text = tweet.text
        match = re.search("Why do you.+?\?", text, re.IGNORECASE)
        if match:
            result = match.group(0).lower()
            if result in seen:
                continue
            else:
                seen.add(result)
                print result
