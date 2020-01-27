import socketio from 'socket.io-client';

const socket = socketio('http://192.168.0.15:3333', {
  autoConnect: false
});

function subscribeToNovoDevs(subscribeFunction) {
  socket.on('novo-dev', subscribeFunction);
}

function connect(latitude, longitude, techs) {
  socket.io.opts.query = {
    latitude,
    longitude,
    techs
  };

  socket.on('message', console.log);
}

function disconnect() {
  if (socket.connected) {
    socket.disconnect();
  }
}

export { connect, disconnect, subscribeToNovoDevs };
