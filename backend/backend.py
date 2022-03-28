#import os
import json
from collections import namedtuple

import summarization

# Named tuples (object representations)
Summary = namedtuple("Summary", "title date content")
Article = namedtuple("Article", "title date content")

# Gotten from https://quillbot.com/summarize
allArticles = {
	"AAPL": [
		# https://finance.yahoo.com/video/tech-giants-apple-benefit-cutting-145115403.html
		Article("How tech giants like Apple benefit from cutting off Russia", "Fri, March 4, 2022", '''Yahoo Finance's Dan Howley joins the Live show to discuss why Big Tech companies like Apple and Microsoft are cutting ties with Russia amid the Russia-Ukraine war.

Video Transcript
BRIAN SOZZI: Silicon Valley's tech giants are joining the rest of the business world in pulling their products and services from Russia. Yahoo Finance tech Dan Howley has been tracking this story for us. Dan.

Stay ahead of the market
DAN HOWLEY: That's right, Brian. They're pulling out, and it could help them in the long run. We actually just got news from Microsoft President Brad Smith that they are pulling sales of their products and services within Russia.

And that follows news from Apple that they are pulling sales of their products within the country, as well as cutting off things like the ability to download RT and Sputnik from the App Store within Europe. They're still allowing that within Russia, though. And the turning off of Apple Maps live traffic in Ukraine so that residents are safe, and Russia can't see where residents may be gathering or where there may be traffic jams.

But when I say that they may be benefiting here, it's obviously the humanitarian act of cutting off the ability to sell to Russia, but it also does give them a boost when it comes to their moral standing in the business community and for potential customers, as well as employees and potential employees.

Really, if you look at something like an Apple, they've been kind of a, I guess, pushing things like civil rights, the ability to protect customers. They famously went against the Justice Department when it came to creating a backdoor for iPhones because they said that that would have created a backdoor that hackers could have exploited for every iPhone on Earth.

So they do things like this because yes, it's the right thing to do, but also because it benefits them. People see that so they're more willing to shop those brands. And then employees who are currently at those companies say, well, you know, my company does a moral thing or the moral thing in situations like this. So I'm proud to work there.

And then prospective employees, especially in a market like this, where it's so hard to get a handle on new employees, they look at businesses and say, look they're going against Russia. I think that that's the right thing to do so I'm going to go with them, versus if a company does not go against Russia, these employees and potential employees would say, this really isn't the place for me. Maybe I got to go somewhere else.

BRIAN SOZZI: All right, Dan Howley, thanks so much.'''),
		# https://qz.com/work/2138072/the-tech-company-grammarly-is-donating-its-russian-profits-to-ukraine/?utm_source=YPL
		Article("Ukrainian-founded Grammarly is donating all the money it made in Russia since 2014", "Fri, March 4, 2022", '''As the war in Ukraine continues, the list of businesses cutting ties to Russia grows. It now includes Apple, Nike, Microsoft, Volkswagen, Meta, and Boeing.

Max Lytvyn and Alex Shevchenko, the Ukrainian-born founders of Grammarly, an app that flags writing errors in email and other documents, say the company has also suspended its services in Russia and Belarus, where Putin’s military has established a staging ground for its offensives.


But Grammarly is taking its support further. It will “donate all of the net revenue earned from Russia and Belarus since the war started in 2014 through 2022 to causes supporting Ukraine,” creating a $5 million fund, its founders said in a statement. Over the past week, Grammarly has already given $1 million to Ukrainian humanitarian groups.

Lytvyn and Shevchenko wrote that they were “devastated by the war against our home country” and inspired by resilience and bravery they’re seeing, but they also “fear for the safety of the people of Ukraine—including our team members—who are directly affected by this invasion.”

Grammarly first launched in Kyiv
Lytvyn, Shevchenko, and Dmytro Lider founded Grammarly in Kyiv in 2009. The company’s headquarters are now in San Francisco, though it still has offices in  Kyiv, as well as New York and Vancouver. Only one month ago, Bloomberg covered the company’s ascent in Silicon Valley: After a recent round of funding, Grammarly is now worth $13 billion.


It is one of a handful of high-profile software firms founded in Ukraine, home to a large IT sector that’s now integral to the global tech supply chain, Bloomberg reports.

Grammarly is also leveraging its AI-driven software to support Ukraine. In addition to a webpage listing ways users can donate, it has created an in-product feature that’s activated whenever a customer writes about Ukraine. Grammarly’s bot will suggest links to resources “for people to educate themselves on the facts of the war and how they can #StandWithUkraine,” the founders said.

Grammarly has offered its premium product free of charge to trusted media outlets in Ukraine which are reporting on the war in English. “Some Ukrainian media outlets have quickly stood up English-language sites to help disseminate truthful information,” the founders said, “and Grammarly supports their efforts.”

The rush to keep employees in Ukraine safe
Grammarly’s top priority in the war was to get their employees and families to safety, the founders said. It has also “transferred business-critical responsibilities to team members outside of Ukraine” so that Ukraine-based staff can focus on themselves and their families.


One such team member, engineering manager Anna Glukhova, recently posted a message on LinkedIn describing life as “hell” within the besieged country. Glukhova was already “far away,” she wrote, but she was hearing about attacks on civilians in her native Kharkiv.

“Every morning, after the sleepless night, I start my day by reaching out to the list of my close ones to learn if they are alive. I do this every half an hour,” she wrote. The minutes while she waits for a response “are horrifying,” she added. “I never wish anyone to experience that.”'''),
	]
}

# Summarize an article
def summarizeArticles(articleList):
	summaryList = []
	for article in articleList:
		summaryList.append(Summary(article.title, article.date, summarization.summarize(article.content)))
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
