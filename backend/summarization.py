import requests

API_KEY = 'b7bfc0337ecba6fab3800ed75141c7aa'

# Summarizes news at newsUrl
def summarize(newsUrl):
#	raise Exception({'key': API_KEY, 'url': newsUrl, 'sentences': 5})
	response = requests.post('http://api.meaningcloud.com/summarization-1.0', data={'key': API_KEY, 'url': newsUrl, 'sentences': 5, 'lang': 'en'})
	result = response.json()
	if result['status']['msg'] == 'OK':
		return result['summary']
	else:
		raise Exception("API Error: '%s'" % result['status']['msg'])
