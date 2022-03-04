<<<<<<< HEAD
const knex = require('knex');
const configuration = require('../../knexfile');

const connection = knex(configuration.development);

=======
const knex = require('knex');
const configuration = require('../../knexfile');

const connection = knex(configuration.development);

>>>>>>> 7a471a0838708c4be7b32b3172ebc09c8a140359
module.exports = connection;