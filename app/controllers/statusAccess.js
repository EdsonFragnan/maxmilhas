'use strict';

module.exports.status = (req, res) => {

    const clients = require('../models/model.js');
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
            clients.allRequisitions((err, data) => {
                if (err) {
                    reject(err);
                }
                resolve(data)
            });
        });
    };

    const callModel = () => {
        return new Promise((resolve, reject) => {
            clients.allBlacklist((err, data) => {
                if (err) {
                    reject(err);
                }
                resolve(data)
            });
        });
    };

    main()
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