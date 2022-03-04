<<<<<<< HEAD
const connection = require('../database/connections');
const { index, create, update } = require('./MelController');


module.exports = {

    // listar todas as colmeias de um apicultor
    async index(request, response) {
        const colmeias = await connection('colmeias').select('*');
        
        return response.json(colmeias);
    },

    // criar uma nova colmeia para um apicultor
    async create(request, response) {
        const { localizacao, peso, temperatura, umidade } = request.body;
        const id_apicultor = request.headers.authorization;

        const [id] = await connection('colmeias').insert({
            localizacao,
            peso,
            temperatura,
            umidade,
            id_apicultor,

        });

        return response.json({ id });
    },

    // deletar uma colmeia de um apicultor
    async delete(request, response) {
        const { id } = request.params;
        const apicultor_id = request.headers.authorization;

        const status = await connection('colmeias')
            .where('id_apicultor', apicultor_id)
            .where('id', id)
            .delete();

        if (status ==! 0) {
            return response.status(204).send();  
        }
        return response.status(401).json({ error: 'Operation not permited.' });

        // wdkdhq

        // const colmeia_apicultor_id = await connection('colmeias')
        //     .where('id_apicultor', apicultor_id)
        //     .select('id')
        //     .first();

        // if (colmeia_apicultor_id ==! apicultor_id) {
        //     return response.status(401).json({ error: 'Operation not permited.' });
        // }

        // await connection('colmeias').where('id', id).delete();
    },

    // atualizar dados de uma colmeia
    async update(request, response) {

    }

=======
const connection = require('../database/connections');
const { index, create, update } = require('./MelController');


module.exports = {

    // listar todas as colmeias de um apicultor
    async index(request, response) {
        const colmeias = await connection('colmeias').select('*');
        
        return response.json(colmeias);
    },

    // criar uma nova colmeia para um apicultor
    async create(request, response) {
        const { localizacao, peso, temperatura, umidade } = request.body;
        const id_apicultor = request.headers.authorization;

        const [id] = await connection('colmeias').insert({
            localizacao,
            peso,
            temperatura,
            umidade,
            id_apicultor,

        });

        return response.json({ id });
    },

    // deletar uma colmeia de um apicultor
    async delete(request, response) {
        const { id } = request.params;
        const apicultor_id = request.headers.authorization;

        const status = await connection('colmeias')
            .where('id_apicultor', apicultor_id)
            .where('id', id)
            .delete();

        if (status ==! 0) {
            return response.status(204).send();  
        }
        return response.status(401).json({ error: 'Operation not permited.' });

        // wdkdhq

        // const colmeia_apicultor_id = await connection('colmeias')
        //     .where('id_apicultor', apicultor_id)
        //     .select('id')
        //     .first();

        // if (colmeia_apicultor_id ==! apicultor_id) {
        //     return response.status(401).json({ error: 'Operation not permited.' });
        // }

        // await connection('colmeias').where('id', id).delete();
    },

    // atualizar dados de uma colmeia
    async update(request, response) {

    }

>>>>>>> 7a471a0838708c4be7b32b3172ebc09c8a140359
}