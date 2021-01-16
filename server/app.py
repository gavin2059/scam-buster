from flask import Flask, render_template, request
from flask_socketio import SocketIO
import logging
import detection

#Create our flask app
app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
log = logging.getLogger('werkzeug')
log.disabled = True
socketio = SocketIO(app, cors_allowed_origins="*")

#On page load, run alert.
#Alert checks if the url is a scam using isScam function. If scam, sends 'scam' event to background.js
#Parameters: url (str)- url of the current website
#            tabID (int)- uniqueID of current tab     
@socketio.on('pageload')
def alert(url, tabID):
    if detection.isScam(url):
        print(url, tabID)
        print(type(tabID))
        socketio.emit('scam', (url, tabID))


if __name__ == '__main__':
    socketio.run(app, debug=True)
