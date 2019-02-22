'use strict';

module.exports.delete = (req, res) => {
   
    const clients = require('../models/model.js');
    const logger = require('../log/logger.js');

    const callModel = (cpf) => {
        return new Promise((resolve, reject) => {
            clients.deleteClient(cpf, (err, data) => {
                if (err) {
                    reject(err);
                }
                resolve({
                    message: `Deleted client ${cpf}`
                });
            });
        });
    };
    
    main()
    async function main() {
        try {
            const callMod = await callModel(req.params.cpf);
            res.json(callMod);
        } catch (e) {
            logger.error(e);
            res.status(e.statusCode).json({message: e.message});
        }
    }
    
};
    

    