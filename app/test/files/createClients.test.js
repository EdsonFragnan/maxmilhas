'use strict';

describe('Test controller Creat Clients.', (done) => {

  beforeEach((done) => {
    done();
  });

  it('Create Clients', (done) => {
    request.post('/createMass')
      .send({
        "cpfs": [ { "cpf": 40164820892, "blacklist": true}, { "cpf": 41321794860, "blacklist": true},]
      })
      .expect(422, done);
  });

});



