#import os
import json
from collections import namedtuple

Summary = namedtuple("Summary", "title date content")

# Gotten from https://quillbot.com/summarize
allSummaries = {
	"AAPL": [
		# https://finance.yahoo.com/video/tech-giants-apple-benefit-cutting-145115403.html
		Summary("How tech giants like Apple benefit from cutting off Russia", "Fri, March 4, 2022", "Tech giants like Apple and Microsoft are pulling out of sales in Russia. They're doing it for humanitarian reasons, but also because it's the right thing to do. It gives them a boost when it comes to their moral standing in the business community and for potential customers."),
		# https://qz.com/work/2138072/the-tech-company-grammarly-is-donating-its-russian-profits-to-ukraine/?utm_source=YPL
		Summary("Ukrainian-founded Grammarly is donating all the money it made in Russia since 2014", "Fri, March 4, 2022", "Grammarly has suspended its services in Russia and Belarus. It will donate all revenue earned from those countries through 2022 to Ukrainian causes. The company's founders say they are \"devastated by the war against our home country,\" but fear for the people of Ukraine. Grammarly is one of a handful of high-profile software firms founded in Ukraine. It has created an in-product feature activated whenever a customer writes about Ukraine. The company has offered its premium product free of charge to trusted media outlets reporting on the war in English."),
		# https://www.reuters.com/world/europe/russia-says-claim-that-it-bombed-childrens-hospital-are-fake-news-2022-03-10/
		Summary("Russia shifts stance on hospital bombing condemned around the world", "Thu, March 10, 2022", "Russia on Thursday shifted its stance over the bombing of a Ukrainian hospital in the city of Mariupol, with a mix of statements that veered between aggressive denials and a call by the Kremlin to establish clear facts.\nAnd the military are very likely to provide some information.\n \"This is information terrorism,\" foreign ministry spokeswoman Maria Zakharova said.\nForeign Minister Sergei Lavrov attacked what he called \"pathetic shouting about so-called atrocities by the Russian armed forces\"\nKyiv and the West reject these as false pretexts for an invasion of a democratic country of 44 million people."),
		# https://deadline.com/2022/03/netflix-stock-upgrade-wall-street-bear-michael-pachter-streaming-1234974314/
		Summary("Netflix Stock Earns Upgrade From Longtime Wall Street Bear: Hell Freezes Over", "Wed, March 9, 2022", "One of the most stubborn (by his own admission) Netflix bears, Wedbush Securities analyst Michael Pachter, has issued a landmark upgrade on the streaming giant’s stock.I thought they were close to saturated in the U.S. … They just keep adding people.\"\nPrior to its success with original content, Netflix subscribers were offered full seasons of television series that had already appeared on broadcast networks.\n \"Theoretically, a subscriber who watches only a handful of Netflix originals can join for six months and quit for six months,\" he wrote, \"and if this becomes the norm, churn will increase and net subscriber additions will slow to a crawl.\""),
		# https://www.barrons.com/articles/wall-street-analysts-are-cutting-meta-targets-but-they-cant-keep-up-with-the-falling-stock-51646774992
		Summary("Wall Street Analysts Are Cutting Meta Targets. But They Can't Keep Up With the Falling Stock.", "Tue, March 8, 2022", "Another analyst slashed his price target for shares of Facebook parent Meta Platforms, but it's still trading significantly below consensus expectations.\nThomas Champion of Piper Sandler cut his target to $240 from $301 but maintained a Neutral rating.\nMeta shares (ticker: FB) have shed 43 percent of their value in 2022 alone. The stock closed up 1.5%, to $190.29, in Tuesday trading."),
	]
}

def lambda_handler(event, context):
#	json_region = os.environ['AWS_REGION']
	ticker = event['ticker']
	try:
		summaries = allSummaries[ticker]
	except KeyError:
		return {
			"statusCode": 404,
			"headers": {
				"Content-Type": "application/json"
			},
			"body": json.dumps({"error": "unknown ticker"})
		}
	return {
		"statusCode": 200,
		"headers": {
			"Content-Type": "application/json"
		},
		"body": json.dumps(summaries)
	}
