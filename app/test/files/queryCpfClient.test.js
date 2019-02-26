'use strict';

describe('Test controller Query CPF Client.', (done) => {

  beforeEach((done) => {
    done();
  });

  it('CPF Client', (done) => {
    request.get('/consult?cpf='+98379555899)
      .expect(200, done);
  });

  it('CPF Invalid', (done) => {
    request.get('/consult?cpf='+9837955090995899)
      .expect(422, done);
  });

});
