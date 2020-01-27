const socketio = require('socket.io');
const parseStringAsArray = require('./models/utils/parseStringAsArray');
const calculateDistance = require('./models/utils/calculateDistance');

let io;
//armanzamento temporario
const connections = [];

exports.setupWebsocket = server => {
  io = socketio(server);

  io.on('connection', socket => {
    //console.log(socket.id);
    //console.log(socket.handshake.query);
    const { latitude, longitude, techs } = socket.handshake.query;

    connections.push({
      id: socket.id,
      coordinates: {
        latitude: Number(latitude),
        longitude: Number(longitude)
      },
      techs: parseStringAsArray(techs)
    });
  });
};

//Compara as coordinates/tecnologias do novo dev com as da busca atual e os km de distancia
exports.findConnections = (coordinates, techs) => {
  return connections.filter(connection => {
    return calculateDistance(coordinates, connection.coordinates) < 10 && connection.techs.some(item => techs.includes(item));
  });
};

//enviar a mensagem de atualização com o dev
exports.sendMessage = (to, message, data) => {
  to.forEach(connection => {
    io.to(connection.id).emit(message, data);
  });
};
