'use strict';

const controller = require('./../../controllers/updateClient.js');
let i = 0;
let req, res = {};

describe('Test controller Update Client.', (done) => {

  before((done) => {
    done();
  });

  it(i++ + ' - Success call model', () => {
    
    req = {
      params: {
        cpf: 19818927880
      },
      body: {
        blacklist: true
      }
    };

    controller.update(req, res);
  });

});
