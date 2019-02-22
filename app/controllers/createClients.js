'use strict';

module.exports.createClients = (req, res) => {
   
    const clients = require('../models/model.js');
    const logger = require('../log/logger.js');

    const callModel = (item) => {
        return new Promise((resolve, reject) => {
            clients.insertClient(item, (err, data) => {
                if (err) {
                    reject(err);
                }
                resolve(data);
            });
        });
    };

    main();
    async function main() {
        try {
            await Promise.all(req.body.cpfs.map(async (item) => {
                await callModel(item);
            }))
            res.json({message: 'Created data mass!'});
        } catch (e) {
            logger.error(e);
            res.status(e.statusCode).json({message: e.message});
        }
    }
};
    

    