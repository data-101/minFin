#import os
import json
from collections import namedtuple

import summarization

# Named tuples (object representations)
Summary = namedtuple("Summary", "title date content")
Article = namedtuple("Article", "title date link")

# Gotten from https://quillbot.com/summarize
allArticles = {
	"AAPL": [
		# https://finance.yahoo.com/video/tech-giants-apple-benefit-cutting-145115403.html - causes error can't find content
#		Article("How tech giants like Apple benefit from cutting off Russia", "Fri, March 4, 2022", "https://finance.yahoo.com/video/tech-giants-apple-benefit-cutting-145115403.html"),
		# https://qz.com/work/2138072/the-tech-company-grammarly-is-donating-its-russian-profits-to-ukraine/?utm_source=YPL
		Article("Ukrainian-founded Grammarly is donating all the money it made in Russia since 2014", "Fri, March 4, 2022", "https://qz.com/work/2138072/the-tech-company-grammarly-is-donating-its-russian-profits-to-ukraine/?utm_source=YPL"),
		# Article 3
		Article("", "", "")
	]
}

# Summarize an article
def summarizeArticles(articleList):
	summaryList = []
	for article in articleList:
		summaryList.append(Summary(article.title, article.date, summarization.summarize(article.link)))
	return summaryList

# Lambda handler
def lambda_handler(event, context):
	# Get ticker
	ticker = event['ticker']
	# Get articles to summarize
	try:
		articles = allArticles[ticker]
	except KeyError:
		return {
			"statusCode": 404,
			"headers": {
				"Content-Type": "application/json"
			},
			"body": json.dumps({"error": "unknown ticker"})
		}
	# Summarize articles
	summaries = summarizeArticles(articles)
	# Return summarized articles
	return {
		"statusCode": 200,
		"headers": {
			"Content-Type": "application/json"
		},
		"body": json.dumps(summaries)
	}
