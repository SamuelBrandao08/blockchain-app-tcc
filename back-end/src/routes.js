const express = require('express');

const SessionController = require('./controller/SessionController');
const ApicultorController = require('./controller/ApicultorController');
const ProfileController = require('./controller/ProfileController');
const ProducaoController = require('./controller/ProducaoController');
const MelController = require('./controller/MelController');
const ColmeiasController = require('./controller/ColmeiasController');


const routes = express.Router();

routes.post('/session', SessionController.create);

routes.get('/apicultor', ApicultorController.index);
routes.post('/apicultor', ApicultorController.create);
routes.delete('/apicultor', ApicultorController.delete);

routes.get('/profile', ProfileController.indexColmeia);
routes.get('/profile', ProfileController.indexProducao);
routes.get('/profile', ProfileController.indexMel);

routes.get('/colmeias', ColmeiasController.index);
routes.post('/colmeias', ColmeiasController.create);
routes.delete('/colmeias/:id', ColmeiasController.delete);

routes.get('/producao', ProducaoController.index);
routes.post('/producao', ProducaoController.create);
routes.delete('/producao/:id', ProducaoController.delete);

routes.get('/mel', MelController.index);
routes.post('/mel', MelController.create);
routes.delete('/mel/:id', MelController.delete);



module.exports = routes;