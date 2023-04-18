const connection = require('../database/connections');


module.exports = {

    // listar todas as colmeias de um apicultor
    async index(request, response) {
        const mel = await connection('mel').select('*');
        
        return response.json(mel);
    },

    // criar um novo produto beneficiado 
    async create(request, response) {
        const { especialidade, peso, fabricacao, validade, localizacao, id_producao } = request.body;

        const [id] = await connection('mel').insert({
            especialidade,
            peso,
            fabricacao,
            validade,
            localizacao,
            id_producao
        });
        
        return response.json({ id });
    },

    // deletar um produto beneficiado(mel) referente a uma producao. 
    async delete(request, response) {
        const { id } = request.params;
        const id_apicultor = request.headers.authorization;

        const status = await connection('producao')
            .innerJoin('mel','mel.id_producao', 'producao.id')
            .where('producao.id_apicultor', id_apicultor)
            .where('mel.id', id)
            .delete();
            
            if (status ==! 0) {
                return response.status(204).send();  
            }
            return response.status(401).json({ error: 'Operation not permited.' });
    },

    // atualizar dados do poduto beneficiado(mel).
    async update(request, response) {

    }

    
}