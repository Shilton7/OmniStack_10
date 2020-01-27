const { Router } = require('express');
const DevController = require('./controllers/devController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

// listagem de devs
routes.get('/devs', DevController.index);

//Salvar devs
routes.post('/devs', DevController.store);

//atualizar
routes.put('/devs/:id', DevController.update);

//deletar
routes.delete('/devs/:_id', DevController.delete);

//buscar devs no maps por techs
routes.get('/search', SearchController.index);

module.exports = routes;
