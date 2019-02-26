'use strict';


describe('Test controller Query All Clients.', (done) => {

  beforeEach((done) => {
    done();
  });

  it('All Clients', (done) => {
    request.get('/clients')
      .expect(200, done);
  });

});
