<<<<<<< HEAD
const connection = require('../database/connections');


module.exports = {
    async create(request, response) {
        const { id } = request.body;

        const apicultor = await connection('apicultor')
            .where('id', id)
            .select('nome')
            .first();
        
        if (!apicultor) {
            return response.status(400).json({ error: 'Não existe apicultor com esse ID' });
        }

        return response.json(apicultor);
    }
=======
const connection = require('../database/connections');


module.exports = {
    async create(request, response) {
        const { id } = request.body;

        const apicultor = await connection('apicultor')
            .where('id', id)
            .select('nome')
            .first();
        
        if (!apicultor) {
            return response.status(400).json({ error: 'Não existe apicultor com esse ID' });
        }

        return response.json(apicultor);
    }
>>>>>>> 7a471a0838708c4be7b32b3172ebc09c8a140359
}