'use strict';

const controller = require('./../../controllers/deleteClient.js');
let i = 0;
let req, res = {};

describe('Test controller Delete Client.', (done) => {

  before((done) => {
    done();
  });

  it(i++ + ' - Success call model', () => {
    req = {
      "params": {
        "cpf": 19818927880
      }
    };

    controller.delete(req, res);
  });

});
