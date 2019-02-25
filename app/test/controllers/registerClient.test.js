'use strict';

const controller = require('./../../controllers/registerClient.js');
let i = 0;
let req, res = {};

describe('Test controller Register Client.', (done) => {

  before((done) => {
    done();
  });

  it(i++ + ' - Success call model', () => {
    req = {
      "query": {
        "cpf": 19818927880
      }
    };

    res = {
      status: (responseStatus) => {
        return responseStatus;
      },
      json: (responseMessage) => {
        return responseMessage;
      }
    };

    controller.register(req, res);
  });

});
