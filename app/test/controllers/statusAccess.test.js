'use strict';

const controller = require('./../../controllers/statusAccess.js');
let i = 0;
let req, res = {};

describe('Test controller Status Access.', (done) => {

  before((done) => {
    done();
  });

  it(i++ + ' - Success call model', () => {
    controller.status(req, res)
  });

});
