const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

// Métodos HTTP: GET, POST, PUT, DELETE

// Tipos de parametros:

// Query params: req.query (Filtros, ordenação, paginação, ...) utilizados no GET
// Route params: request.params (Identificar um recurso na alteração ou remoção) PUT E DELETE
// Body params: request.body (Dados para criação ou alteração de um registro) POST E PUT

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);

routes.get('/search',SearchController.index)

module.exports = routes;