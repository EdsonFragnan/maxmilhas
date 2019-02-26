'use strict';


describe('Test controller Status Access.', (done) => {

  beforeEach((done) => {
    done();
  });

  it('Status Access', (done) => {
    request.get('/status')
      .expect(200, done);
  });

});
