#!/usr/bin/python3
import requests

def number_of_subscribers(subreddit):
    url = f"https://www.reddit.com/r/{subreddit}/about.json"
    headers = {'User-Agent': 'Custom User Agent'}  # Setting a custom User-Agent
    response = requests.get(url, headers=headers, allow_redirects=False)  # Avoid following redirects

    if response.status_code == 200:
        data = response.json()
        return data['data']['subscribers']
    else:
        return 0
