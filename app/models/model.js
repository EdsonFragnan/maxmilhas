'use strict';

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./maxmilhas');

module.exports = {
    
    allClients: (callback) => {
        db.all('SELECT * FROM CLIENT', (err, rows) => {
            if (err) {
                let message = {
                    statusCode: 422,
                    message: 'Error'
                };
                callback(message, null);
            }
            callback(null, rows);
        });
    },

    allRequisitions: (callback) => {
        db.all('SELECT * FROM REQUISITION', (err, rows) => {
            if (err) {
                let message = {
                    statusCode: 422,
                    message: 'Error'
                };
                callback(message, null);
            }
            callback(null, rows);
        });
    },


    allBlacklist: (callback) => {
        db.all('SELECT * FROM CLIENT WHERE BLACKLIST = 1', (err, rows) => {
            if (err) {
                callback(err, null);
            }
            callback(null, rows);
        });
    },

    cpfSearch: (cpf, callback) => {
        db.all('SELECT * FROM CLIENT WHERE CPF = ' + cpf, (err, rows) => {
            if (err) {
                let message = {
                    statusCode: 422,
                    message: 'Error'
                };
                callback(message, null);
            }
            callback(null, rows);
        });
    },

    insertClient: (client, callback) => {
        let stmt = db.prepare('INSERT INTO CLIENT (CPF, BLACKLIST) VALUES (?,?)');
        stmt.run(client.cpf, client.blacklist, (err, row) => {
            if (err) {
                let message = {
                    statusCode: 422,
                    message: 'Exists client'
                };
                callback(message, null);
            } else {
                stmt.finalize();
                callback(null, true);
            }
        });
    },

    insertRequisition: (status, callback) => {
        let stmt = db.prepare('INSERT INTO REQUISITION (STATUS) VALUES (?)');
        stmt.run(status, (err, row) => {
            if (err) {
                let message = {
                    statusCode: 422,
                    message: 'Error'
                };
                callback(message, null);
            } else {
                stmt.finalize();
                callback(null, true);
            }
        });
    },

    updateClient: (client, callback) => {
        let stmt = db.prepare('UPDATE CLIENT SET BLACKLIST=? WHERE CPF=?');
        stmt.run(client.blacklist, client.cpf, (err, row) => {
            if (err) {
                let message = {
                    statusCode: 422,
                    message: 'Error'
                };
                callback(message, null);
            } else {
                callback(null, row);
            }
        });
    },

    deleteClient: (cpf, callback) => {
        let stmt = db.prepare('DELETE FROM CLIENT WHERE CPF=?');
        stmt.run(cpf, (err, row) => {
            if (err) {
                let message = {
                    statusCode: 422,
                    message: 'Error'
                };
                callback(message, null);
            } else {
                callback(null, row);
            }
        });
    }
    
};