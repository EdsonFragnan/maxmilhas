'use strict';

module.exports.createClients = (app, req, res) => {
   
    const logger = require('../log/logger.js');
    const sqlite3 = require('sqlite3').verbose();
    const db = new sqlite3.Database('./maxmilhas'); 
    const cpfDao = new app.models.CpfDao(db);

    const callModel = (item) => {
        return new Promise((resolve, reject) => {
            cpfDao.insertClient(item, (err, data) => {
                if (err) {
                    let message = {
                        statusCode: 422,
                        message: 'Error creating.'
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
    

    