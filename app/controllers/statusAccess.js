'use strict';

module.exports.status = (app, req, res) => {

    const sqlite3 = require('sqlite3').verbose();
    const db = new sqlite3.Database('./maxmilhas'); 
    const cpfDao = new app.models.CpfDao(db);

    const logger = require('../log/logger.js');

    const formatUptime = (value) => {
        let sec_num = parseInt(value, 10);
        let hours   = Math.floor(sec_num / 3600);
        let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        let seconds = sec_num - (hours * 3600) - (minutes * 60);

        if (hours   < 10) {hours   = "0"+hours;}
        if (minutes < 10) {minutes = "0"+minutes;}
        if (seconds < 10) {seconds = "0"+seconds;}
        let time    = hours+':'+minutes+':'+seconds;
        return time;
    };

    const mountResponse = (_clients, total) => {
        let stauts = {
            blacklist_quantity: _clients.length,
            uptime: formatUptime(process.uptime()),
            total_requisitions: total.length

        };
        return stauts;
    };

    const allRequisition = () => {
        return new Promise((resolve, reject) => {
            cpfDao.allRequisitions((err, data) => {
                if (err) {
                    let message = {
                        statusCode: 422,
                        message: 'Error'
                    };
                    reject(message);
                }
                resolve(data);
            });
        });
    };

    const callModel = () => {
        return new Promise((resolve, reject) => {
            cpfDao.allBlacklist((err, data) => {
                if (err) {
                    let message = {
                        statusCode: 422,
                        message: 'Status Error'
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
            const total =  await allRequisition();
            const callMod = await callModel();
            const response = await mountResponse(callMod, total);
            res.json(response);
        } catch (e) {
            logger.error(e);
            res.status(e.statusCode).json({message: e.message});
        }
    }
    
};