'use strict';

module.exports = () => {
    
    const sqlite3 = require('sqlite3').verbose();
    let db = new sqlite3.Database('./maxmilhas');
        
    db.serialize(() => {    
        db.run('CREATE TABLE if not exists client (cpf int NOT NULL PRIMARY KEY, blacklist boolean NOT NULL)');    
        db.run('CREATE TABLE if not exists requisition (status boolean NOT NULL)');    
    });
    
    db.close();
};


