const express = require('express');
const mongoose = require('mongoose');
const dbConfig = require('./config/database.config.js');
const routes = require('./routes');
const cors = require('cors');

const app = express();

//conexão
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Successfully connected to the database');
  })
  .catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
  });

app.use(cors()); //habilitando cors /acesso externo
app.use(express.json()); //formatado de response
app.use(routes);

//porta server
app.listen(3333, () => {
  console.log('Server is listening on port 3333');
});
