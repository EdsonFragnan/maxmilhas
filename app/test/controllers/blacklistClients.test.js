'use strict';

const controller = require('./../../controllers/blacklistClients.js');
let i = 0;
let req, res = {};
const db = require('../../config/db.js');

describe('Test controller BlackList Clients.', (done) => {

  before((done) => {
    db();
    done();
  });

  it(i++ + ' - Success call model', () => {

    controller.blacklist(req, res)
  });

});
