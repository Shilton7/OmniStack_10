const mongoose = require('mongoose');
const PointSchema = require('../models/PointSchema');

// Tabela de Devs
const DevSchema = new mongoose.Schema({
  name: String,
  github_username: String,
  bio: String,
  avatar_url: String,
  techs: [String],
  location: {
    type: PointSchema,
    index: '2dsphere'
  }
});

module.exports = mongoose.model('Dev', DevSchema);
