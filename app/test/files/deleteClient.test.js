'use strict';


describe('Test controller Delete Client.', (done) => {

  beforeEach((done) => {
    done();
  });

  it('Delete Client', (done) => {
    request.delete('/delete/41321794860')
      .expect(204, done);
  });

  it('Invalid CPF', (done) => {
    request.delete('/delete/12345678901')
      .expect(422, done);
  });

  it('Invalid CPF', (done) => {
    request.delete('/delete/12345132678901')
      .expect(422, done);
  });

});
