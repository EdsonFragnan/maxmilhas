'use strict';

module.exports.requisition = () => {

    const clients = require('../models/model.js');
    const logger = require('../log/logger.js');

    const callModelRequisition = () => {
        return new Promise((resolve, reject) => {
            clients.insertRequisition(true, (err, data) => {
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
