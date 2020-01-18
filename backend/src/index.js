const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');

const app = express();

//conexão
mongoose.connect('mongodb+srv://shilton:shilton@clusteraircnc-kosdj.mongodb.net/devmaps?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(cors()); //habilitando cors /acesso externo
app.use(express.json()); //formatado de response
app.use(routes);

//porta
app.listen(3333);
