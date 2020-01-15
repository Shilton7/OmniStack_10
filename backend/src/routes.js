const { Router } = require('express');
const DevController = require('./controllers/devController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

// listagem de devs
routes.get('/devs', DevController.index);

//Salvar devs
routes.post('/devs', DevController.store);

//buscar devs no maps por techs
routes.get('/search', SearchController.index);

module.exports = routes;
