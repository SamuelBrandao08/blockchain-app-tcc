const connection = require('../database/connections');

module.exports = {

    // listar toda a producao de um apicultor
    async index(request, response) {
        const producao = await connection('producao').select('*');
        
        return response.json(producao);
     },

    // cadastrar uma nova producao de mel.
    async create(request, response) {
        const { peso, data_coleta, localizacao, especialidade, qtd_colmeias } = request.body;
        const id_apicultor = request.headers.authorization;

        const [id] = await connection('producao').insert({
            peso, 
            data_coleta,
            localizacao, 
            especialidade, 
            qtd_colmeias,
            id_apicultor,
            id_colmeias: [],
        });
        
        return response.json({ id });
    },

    // deletar uma producao de mel.
    async delete(request, response) {
        const { id } = request.params;
        const id_apicultor = request.headers.authorization;

        const status = await connection('producao')
            .where('id_apicultor', id_apicultor)
            .where('id', id)
            .delete();

            if (status ==! 0) {
                return response.status(204).send();  
            }
            return response.status(401).json({ error: 'Operation not permited.' });
        
    },

    // atualizar uma producao de mel.
    async update(request, response) {

    }
};