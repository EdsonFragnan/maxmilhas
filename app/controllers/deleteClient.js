'use strict';

module.exports.delete = (app, req, res) => {
   
    const sqlite3 = require('sqlite3').verbose();
    const db = new sqlite3.Database('./maxmilhas'); 
    const cpfDao = new app.models.CpfDao(db);
    const logger = require('../log/logger.js');

    const callModel = (cpf) => {
        return new Promise((resolve, reject) => {
            cpfDao.deleteClient(cpf, (err, data) => {
                if (err) {
                    let message = {
                        statusCode: 422,
                        message: 'Error deleting'
                    };
                    reject(message);
                }
                resolve({
                    message: `Deleted CPF ${cpf}`
                });
            });
        });
    };
    
    main()
    async function main() {
        try {
            const callMod = await callModel(req.params.cpf);
            logger.info('CPF deleted');
            res.status(204).json();
        } catch (e) {
            logger.error(e);
            res.status(e.statusCode).json({message: e.message});
        }
    }
    
};
    

    