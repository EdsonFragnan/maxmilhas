'use strict';

module.exports.register = (app, req, res) => {
   
    const sqlite3 = require('sqlite3').verbose();
    const db = new sqlite3.Database('./maxmilhas'); 
    const cpfDao = new app.models.CpfDao(db);
    const logger = require('../log/logger.js');

    const maskCPF = (value_cpf) => {
        value_cpf = value_cpf.toString();
        return value_cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g,"\$1.\$2.\$3\-\$4");
    };
    
    const mountResponse = (_clients) => {
        let item = {
            cpf: maskCPF(_clients.cpf),
            blacklist: _clients.blacklist
        };
        return item;
    };

    const callModel = (client) => {
        return new Promise((resolve, reject) => {
            cpfDao.insertClient(client, (err, data) => {
                if (err) {
                    let message = {
                        statusCode: 422,
                        message: 'Error registering'
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
            const response = await mountResponse(req.body);
            await callModel(req.body);
            res.json(response);
        } catch (e) {
            logger.error(e);
            res.status(e.statusCode).json({message: e.message});
        }
    }

    
};