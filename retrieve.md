
retrieve and convert relevant key words
Math
- run an example that gets the key words from the linked metadata
- should take relevant files and export to a separate txt

Order
- scan uploaded syllabus
- key words will be on the syllabus
- from those key words, something should parse and store them 


- have a file hardcoded with html link href's and metadata from those
- have a file scan for words
hardcoded into the other file

- from the related videos, create a separate txt/js (logic) with the related
htmls
- probably will have to be js bc those related videos feed into the live
server
- user should be able to choose class topic option
after uploading their syllabus  and get relevant vids


Link for putting in different html file:
https://stackoverflow.com/questions/60110757/put-scraped-data-into-an-html-file-python3 

From:
0

If I understand your query correctly:

You would like to retrieve, from a news website, every news date, title and url
Then, you would like to put it into an HTML page, as a table.
You've already done the webscraping.

I would suggest your script does this:

Init a html content string with headers and the start of your table
Do the webscraping
For each news you find
Retrieve the data you seek: date, title, utl
Append to your content string the table row with this data
Finish your content string by closing your table and putting footers
Write this content string into an html file
This can be achieved in bash or python, and probably other languages.

Other:
https://stackoverflow.com/questions/17502071/transfer-data-from-one-html-file-to-another