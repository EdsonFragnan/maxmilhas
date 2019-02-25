'use strict';

const controller = require('./../../controllers/createClients.js');
let i = 0;
let res = {};

describe('Test controller Creat Clients.', (done) => {

  before((done) => {
    done();
  });

  it(i++ + ' - Success call model', () => {
    
    const req = {
      "body": {
        "cpfs": [
            { "cpf": 82192230818, "blacklist": false},
            { "cpf": 41321794860, "blacklist": true},
            { "cpf": 40164820892, "blacklist": true},
            { "cpf": 58463054820, "blacklist": false},
            { "cpf": 79267161890, "blacklist": true},
            { "cpf": 77593454886, "blacklist": false},
            { "cpf": 38221510840, "blacklist": true},
            { "cpf": 95210334872, "blacklist": false},
            { "cpf": 98379555899, "blacklist": false},
            { "cpf": 19818927885, "blacklist": true}
        ]
      }
    };

    controller.createClients(req, res);
  });

});
