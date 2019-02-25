'use strict';

const assert = require('assert');
const controller = require('./../../controllers/queryAllClients.js');
let i = 0;
let res = {};

describe('Test controller Query All Clients.', (done) => {

  before((done) => {
    done();
  });

  it(i++ + ' - Success call model', () => {
    
    let req = {};

    controller.allClients(req, res);
  });

});
