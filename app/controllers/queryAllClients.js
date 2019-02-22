'use strict';

module.exports.allClients = (req, res) => {

    const logger = require('../log/logger.js');
    const clients = require('../models/model.js');

    const maskCPF = (value_cpf) => {
        value_cpf = value_cpf.toString();
        return value_cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g,"\$1.\$2.\$3\-\$4");
    };
    
    const mountResponse = (_clients) => {
        let newObject = [];
        let item = {};
        _clients.forEach(row => {
            if (row.blacklist === 0) {
                item = {
                    cpf: maskCPF(row.cpf),
                    blacklist: false
                };
                newObject.push(item);
            } else {
                item = {
                    cpf: maskCPF(row.cpf),
                    blacklist: true
                };
                newObject.push(item);
            }
        });
        return newObject;
    };

    const callModel = () => {
        return new Promise((resolve, reject) => {
            clients.allClients((err, data) => {
                if (err) {
                    reject(err);
                }
                resolve(data)
            });
        });
    };
        
    main();
    async function main() {
        try {
            const callMod = await callModel();
            const response = await mountResponse(callMod);
            if (response.length === 0) {
                logger.info('Do not have data!');
                res.status(204).json();
            }
            res.json(response);
        } catch (e) {
            logger.error(e);
            res.status(e.statusCode).json({message: e.message});
        }
    }
  
};

