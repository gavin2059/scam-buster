from flask import Flask, render_template, request
from flask_socketio import SocketIO
import detection

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins="*")


@socketio.on('pageload')
def alert(url, tabID):
    if detection.isScam(url):
        print(url, tabID)
        socketio.emit('scam', tabID)


if __name__ == '__main__':
    socketio.run(app, debug=True)
