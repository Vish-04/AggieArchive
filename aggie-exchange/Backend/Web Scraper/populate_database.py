import json
import requests


with open("vite-super-secret\Backend\Web Scraper\data\course.json", "r") as f:
    courses = json.load(f)

url = "http://localhost:3000/courses/add"


for course in courses:
    response = requests.post(url, json=course)

    if response.status_code == 400:
        print(response.json)
    else:
        print("went through ig?")
    