<<<<<<< HEAD
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
routes.delete('/apicultor/:id', ApicultorController.delete);

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



=======
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
routes.delete('/apicultor/:id', ApicultorController.delete);

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



>>>>>>> 7a471a0838708c4be7b32b3172ebc09c8a140359
module.exports = routes;