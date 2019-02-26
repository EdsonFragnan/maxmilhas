'use strict';

describe('Test controller BlackList Clients.', (done) => {

  afterEach((done) => {
    done();
  });

  it('Blacklist Clients', (done) => {
    request.get('/blacklist')
      .expect(200, done);
  });

});
