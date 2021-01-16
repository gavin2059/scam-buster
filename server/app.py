from flask import Flask, render_template, request
from flask_socketio import SocketIO
import logging
import detection

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
log = logging.getLogger('werkzeug')
log.disabled = True
socketio = SocketIO(app, cors_allowed_origins="*")


@socketio.on('pageload')
def alert(url, tabID):
    if detection.isScam(url):
        print(url, tabID)
        socketio.emit('scam', (url, tabID))


if __name__ == '__main__':
    socketio.run(app, debug=True)
