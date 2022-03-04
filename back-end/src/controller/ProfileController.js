<<<<<<< HEAD
const connection = require('../database/connections');

module.exports = {

    //funcionalidades do usuario(apicultor) dentro da aplicacao.

    // listar as comeias de um apicultor
    async indexColmeia(request, response) {
        const id_apicultor = request.headers.authorization;

        const colmeias = await connection('colmeias')
            .where('id_apicultor', id_apicultor)
            .select('*');

        return response.json(colmeias);
    },

    // listar a producao de um apicultor
    async indexProducao(request, response) {
        const id_apicultor = request.headers.authorization;

        const producao = await connection('producao')
            .where('id_apicultor', id_apicultor)
            .select('*');

        return response.json(producao);
    },

    // listar toods os produtos beneficiados pertencentes a uma producao especifica de um apicultor.
    async indexMel(request, response) {
        const id_apicultor = request.headers.authorization;

        const mel = await connection('producao')
            .innerJoin('mel','mel.id_producao', 'producao.id')
            .where('producao.id_apicultor', id_apicultor)
            .select(['mel.*']);

        return response.json(mel);
    }

    
=======
const connection = require('../database/connections');

module.exports = {

    //funcionalidades do usuario(apicultor) dentro da aplicacao.

    // listar as comeias de um apicultor
    async indexColmeia(request, response) {
        const id_apicultor = request.headers.authorization;

        const colmeias = await connection('colmeias')
            .where('id_apicultor', id_apicultor)
            .select('*');

        return response.json(colmeias);
    },

    // listar a producao de um apicultor
    async indexProducao(request, response) {
        const id_apicultor = request.headers.authorization;

        const producao = await connection('producao')
            .where('id_apicultor', id_apicultor)
            .select('*');

        return response.json(producao);
    },

    // listar toods os produtos beneficiados pertencentes a uma producao especifica de um apicultor.
    async indexMel(request, response) {
        const id_apicultor = request.headers.authorization;

        const mel = await connection('producao')
            .innerJoin('mel','mel.id_producao', 'producao.id')
            .where('producao.id_apicultor', id_apicultor)
            .select(['mel.*']);

        return response.json(mel);
    }

    
>>>>>>> 7a471a0838708c4be7b32b3172ebc09c8a140359
}