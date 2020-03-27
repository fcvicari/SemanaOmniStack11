'use strict';
const conection = require('../database/conection')

module.exports = {
    async index(request,  response) {
        const { page = 1 } = request.query;

        const [ countIncident ] = await conection('incidents').count('*');

        const incidents = await conection('incidents')
            .join('ongs', 'incidents.ong_id', 'ongs.id')
            .limit(5)
            .offset((page - 1) * 5)
            .select(
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            );
        
        response.header('X-Total-Count', countIncident['count(*)']);
        return response.json(incidents);
    },

    async create(request,  response) {
        const {title, description, value} = request.body;
        const ong_id = request.headers.autorization;

        const [id] = await conection('incidents').insert(
            {
                title,
                description,
                value,
                ong_id,
            }
        )

        return response.json({id});
    },

    async delete(request,  response) {
        const { id } = request.params;
        const ong_id = request.headers.autorization;

        const incidents = await conection('incidents').where('id', id).select('ong_id').first();

        if (incidents.ong_id != ong_id) {
            return response.status(401).json({ error: 'Operação não permitida.' });
        }

        await conection('incidents').where('id', id).delete();

        return response.status(204).send();
    },
}