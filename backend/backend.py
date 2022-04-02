import flask
from flask import session, request

app = flask.Flask(__name__)
app.secret_key = 'SECRET_KEY_HERE'

users = {}
sessions = {}

@app.route("/auth", methods=['POST'])
def auth():
	# Get username and password
	username = request.form['username']
	password = request.form['password']
	# Process login/signup request
	if 'type' in request.form:
		if request.form['type'] == "login":
			if username in users:
				if users[username]['password'] == password:
					session['user'] = username
					return {'result': 'success', 'msg': 'logged in'}
				else:
					return {'result': 'error', 'msg': 'wrong password'}
			else:
				return {'result': 'error', 'msg': "user doesn't exist"}
		elif request.form['type'] == "signup":
			if username in users:
				return {'result': 'error', 'msg': 'username taken'}
			else:
				users[username] = {'password': password, 'portfolio': set()}
				return {'result': 'success', 'msg': 'signed up'}
		else:
			return {'result': 'error', 'msg': 'invalid request'}
	else:
		return {'result': 'error', 'msg': 'invalid request'}

@app.route("/portfolio", methods=['GET', 'POST'])
def portfolio():
	if 'user' in session:
		if request.method == 'GET':
			return {'result': 'success', 'data': list(users[session['user']]['portfolio'])}
		else:
			if request.form['action'] == 'add':
				users[session['user']]['portfolio'].add(request.form['item'])
				return {'result': 'success', 'msg': 'stock added'}
			elif request.form['action'] == 'remove':
				try:
					users[session['user']]['portfolio'].remove(request.form['item'])
					return {'result': 'success', 'msg': 'stock removed'}
				except KeyError:
					return {'result': 'error', 'msg': 'stock not in portfolio'}
			else:
				return {'result': 'error', 'msg': 'invalid request'}
	else:
		return {'result': 'error', 'msg': 'must sign in first'}

if __name__ == "__main__":
	app.run()
