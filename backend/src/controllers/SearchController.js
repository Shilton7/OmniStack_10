const Dev = require('../models/dev');
const parseStringAsArray = require('../models/utils/parseStringAsArray');

module.exports = {
  //buscar devs num raio de 10k, juntamente com as suas tecnologias
  async index(request, response) {
    const { latitude, longitude, techs } = request.query;
    const techsArray = parseStringAsArray(techs);

    const devsMaps = await Dev.find({
      techs: {
        $in: techsArray
      },
      location: {
        $near: {
          $geometry: {
            type: `Point`,
            coordinates: [longitude, latitude]
          },
          $maxDistance: 10000 //10km max distancia
        }
      }
    });

    return response.json(devsMaps);
  }
};
