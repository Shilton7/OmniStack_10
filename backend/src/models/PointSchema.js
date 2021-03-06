const mongoose = require('mongoose');

//tabela de Localização
const PointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true
  },
  coordinates: {
    type: [Number], //longitude/latitude
    required: true
  }
});

module.exports = PointSchema;
