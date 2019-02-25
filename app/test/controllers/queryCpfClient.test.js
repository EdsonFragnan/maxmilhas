'use strict';

const controller = require('./../../controllers/queryCpfClient.js');
let i = 0;
let req, res = {};

describe('Test controller Query CPF Client.', (done) => {

  before((done) => {
    done();
  });

  it(i++ + ' - Success call model', () => {
    req = {
      "query": {
        "cpf": 19818927880
      }
    };

    controller.consulta(req, res);
  });

});
