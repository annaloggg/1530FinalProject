import requests
from bs4 import BeautifulSoup
import json
import re

url = 'https://www.youtube.com/shorts/3LSNqYT-BQA'

html = requests.get(url).text
soup = BeautifulSoup(html, "html.parser")
for script in soup.find_all("script"):
    if "ytInitialPlayerResponse" in script.text:
        meta = script.text
        break

#capturing the entire JS string of Youtubes video metadata
match = re.search(r"ytInitialPlayerResponse = (\{.*\});", meta)
#converting it to a string so json can use it
str = match.group(1) 

#reading the json video metadata of the file and converting it
data = json.loads(str)
description = data['videoDetails']['shortDescription']
print(description)