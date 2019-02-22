'use strict';

module.exports.consulta = (req, res) => {
   
    const clients = require('../models/model.js');
    const logger = require('../log/logger.js');

    const mountResponse = (clients) => {
        let response = '';
        clients.forEach((client) => {
            if (client.blacklist === 0) {
                response = 'BLOCK';
            } else {
                response = 'FREE';
            }
        });
        return response;
    };

    const callModel = (cpf) => {
        return new Promise((resolve, reject) => {
            clients.cpfSearch(cpf, (err, data) => {
                if (err) {
                    reject(err);
                }
                resolve(data);
            });
        });
    };

    main()
    async function main() {
        try {   
            const callMod = await callModel(req.query.cpf);
            const response = await mountResponse(callMod);
            if (callMod.length === 0) {
                logger.info('Client not found!');
                res.status(204).json();
            }
            res.json({message: response});
        } catch (e) {
            logger.error(e);
            res.status(e.statusCode).json({message: e.message});
        }
    }
    
};