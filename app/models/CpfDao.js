'use strict';

class CpfDao {

    constructor(db) {
        this._db = db;
    }

    allClients (callback) {
        this._db.all('SELECT * FROM CLIENT', callback);
    }

    allRequisitions (callback) {
        this._db.all('SELECT * FROM REQUISITION', callback);
    }

    allBlacklist (callback) {
        this._db.all('SELECT * FROM CLIENT WHERE BLACKLIST = 1', callback);
    }

    cpfSearch (cpf, callback) {
        this._db.all('SELECT * FROM CLIENT WHERE CPF = (?)', [cpf], callback);
    }

    insertClient (client, callback) {
        this._db.run('INSERT INTO CLIENT (BLACKLIST, CPF) VALUES (?,?)', [client.blacklist, client.cpf], callback);
    }

    updateClient (client, callback) {
        this._db.run('UPDATE CLIENT SET BLACKLIST=? WHERE CPF=?', [client.blacklist, client.cpf], callback);
    }

    insertRequisition (status, callback) {
        this._db.run('INSERT INTO REQUISITION (STATUS) VALUES (?)', [status], callback);
    }

    deleteClient (cpf, callback) {
        this._db.run('DELETE FROM CLIENT WHERE CPF=?', [cpf], callback);
    }
}

module.exports = () => {
    return CpfDao;
};
