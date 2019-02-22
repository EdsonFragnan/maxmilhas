'use strict';

module.exports.register = (req, res) => {
   
    const clients = require('../models/model.js');
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
            clients.insertClient(client, (err, data) => {
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
            const response = await mountResponse(req.body);
            await callModel(req.body);
            res.json(response);
        } catch (e) {
            logger.error(e);
            res.status(e.statusCode).json({message: e.message});
        }
    }

    
};