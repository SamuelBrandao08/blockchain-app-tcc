const connection = require('../database/connections');
const crypto = require('crypto');

module.exports = {

    // listar todos os usuarios da aplicacao.
    async index(request, response) {
       const apicultor = await connection('apicultor').select('*');
       
       return response.json(apicultor);
    },

    // metodo para criar um novo usuario
    async create(request, response) {
        const { nome, email, contato, cidade, uf } = request.body;
    
        const id = crypto.randomBytes(4).toString('HEX');

        await connection('apicultor').insert({
            id,
            nome, 
            email, 
            contato, 
            cidade, 
            uf,
        });

    return response.json({ id });
    },

    async delete(request, response) {
        const id_apicultor = request.headers.authorization;

        const status = await connection('apicultor')
            .where('id', id_apicultor)
            .delete();

        if (status ==! 0) {
            return response.status(204).send();  
        }
        return response.status(401).json({ error: 'Operation not permited.' });
    },

    async update(request, response) {

        return
    }
}