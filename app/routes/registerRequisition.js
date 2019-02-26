'use strict';

module.exports.requisition = (app) => {

    const logger = require('../log/logger.js');
    const sqlite3 = require('sqlite3').verbose();
    const db = new sqlite3.Database('./maxmilhas'); 
    const cpfDao = new app.models.CpfDao(db);

    const callModelRequisition = () => {
        return new Promise((resolve, reject) => {
            cpfDao.insertRequisition(true, (err, data) => {
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
                await callModelRequisition();
                logger.info('Success request!');
            } catch (e) {
                logger.error(e);
            }
        }

};
