const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

//conexão
mongoose.connect('mongodb+srv://shilton:shilton@clusteraircnc-kosdj.mongodb.net/devmaps?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//formatado de response
app.use(express.json());
app.use(routes);

//porta
app.listen(3333);
