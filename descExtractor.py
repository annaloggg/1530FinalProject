import requests
from bs4 import BeautifulSoup
import json
import re

url = ['https://www.youtube.com/shorts/tXNUD8NCmcU', 'https://www.youtube.com/shorts/xcXmkhKIr_M', 'https://www.youtube.com/shorts/Prv_X12VWVA',
      'https://www.youtube.com/shorts/sWNcMRCV98M', 'https://www.youtube.com/shorts/ctQC0eXxIUc', 'https://www.youtube.com/shorts/YDacLL70V5M',
       'https://www.youtube.com/shorts/rA-T4VPenD4', 'https://www.youtube.com/shorts/bWzkI87cL3E', 'https://www.youtube.com/shorts/gMBJFcfuFt0',
       'https://www.youtube.com/shorts/lCGeq9N9ATM', 'https://www.youtube.com/shorts/sK0o3um7ruY', 'https://www.youtube.com/shorts/pFag4mBsO1I',
       'https://www.youtube.com/shorts/ZwMcp9Deb1U']

for link in url:
    html = requests.get(link).text
    soup = BeautifulSoup(html, "html.parser")
    for script in soup.find_all("script"):
        if "ytInitialPlayerResponse" in script.text:
            meta = script.text
            break
    #capturing the entire JS string of Youtubes video metadata
    match = re.search(r"ytInitialPlayerResponse = (\{.*\});", meta)
    #converting it to a string so json can use it
    str = match.group(1) 
    data = json.loads(str)
    description = data['videoDetails']['shortDescription']
    title = data['videoDetails']['title']
    #storing them into their own html file for keyword search
    html_file = title + ".html"
    file = open(html_file, "w", encoding="utf-8")
    file.write("<html>\n")
    file.write("<head>\n")
    file.write("\t<meta charset=\"UTF-8\">\n")
    file.write("\t<title>" +title+ "</title>\n")
    file.write("</head>\n")
    file.write("<body>\n")
    file.write("\t<h1>" + description+"</h1>\n")
    file.write("</body>\n")
    file.write("</html>")
    file.close()