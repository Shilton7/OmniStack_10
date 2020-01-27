const axios = require('axios');
const Dev = require('../models/dev');
const parseStringAsArray = require('../models/utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket');

module.exports = {
  async index(request, response) {
    const devs = await Dev.find();
    return response.json(devs);
  },
  async store(request, response) {
    const { github_username, techs, longitude, latitude } = request.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const techsArray = parseStringAsArray(techs);
      const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
      };

      const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
      const { name = login, avatar_url, bio } = apiResponse.data;

      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location
      });

      //Filtrar Real Time após cadastro
      const sendSocketMessageTo = findConnections({ latitude, longitude }, techsArray);
      //console.log(sendSocketMessageTo);
      sendMessage(sendSocketMessageTo, 'novo-dev', dev);
    }

    return response.json(dev);
  },
  async update(request, response) {
    const { id } = request.params;
    let { techs, latitude, longitude, ...dataToUpdate } = request.body;

    if (dataToUpdate.github_username) delete dataToUpdate.github_username;

    if (longitude && latitude)
      dataToUpdate.location = {
        type: 'Point',
        coordinates: [longitude, latitude]
      };

    if (techs) dataToUpdate.techs = parseStringAsArray(techs);

    const dev = await Dev.findByIdAndUpdate(id, dataToUpdate, { new: true });

    return response.json(dev);
  },
  async delete(request, response) {
    const dev = await Dev.findOneAndDelete(request.params._id)
      .then(dev => {
        if (!dev) {
          return response.status(404).send({
            message: 'Dev not found with id ' + request.params._id
          });
        }
        response.send({ message: 'Dev deleted successfully!' });
      })
      .catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
          return response.status(404).send({
            message: 'Dev not found with id ' + request.params._id
          });
        }
        return response.status(500).send({
          message: 'Could not delete note with id ' + request.params._id
        });
      });
  }
};
