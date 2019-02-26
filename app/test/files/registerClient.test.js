'use strict';


describe('Test controller Register Client.', (done) => {

  beforeEach((done) => {
    done();
  });

  it('Register Client Access', (done) => {
    request.post('/register')
      .send({
        cpf: '98379555894',
        blacklist: true
      })
      .expect(422, done);
  });

  it('Register Client Access - Erro', (done) => {
    request.post('/register')
      .send({
        cpf: '98379555899',
        blacklist: ''
      })
      .expect(422, done);
  });

  it('Register Client Access - Erro', (done) => {
    request.post('/register')
      .send({
        cpf: '',
        blacklist: ''
      })
      .expect(422, done);
  });

});
