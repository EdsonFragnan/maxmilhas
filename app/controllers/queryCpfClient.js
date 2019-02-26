'use strict';

module.exports.consult = (app, req, res) => {
   
    const sqlite3 = require('sqlite3').verbose();
    const db = new sqlite3.Database('./maxmilhas'); 
    const cpfDao = new app.models.CpfDao(db);

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
            cpfDao.cpfSearch(cpf, (err, data) => {
                if (err) {
                    let message = {
                        statusCode: 422,
                        message: 'Error to find the CPF'
                    };
                    reject(message);
                }
                resolve(data);
            });
        });
    };

    main();
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