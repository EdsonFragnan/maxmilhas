'use strict';

describe('Test controller Update Client.', (done) => {

  after(function () {
    process.exit(0);
  });

  it('Update Client', (done) => {
    request.patch('/update/95210334872')
      .send({
        blacklist: true
      })
      .expect(200, done);
  });

  it('Update Client - Error', (done) => {
    request.patch('/update/9521033487295210334872')
      .expect(422, done);
  });

  it('Update Client - Error', (done) => {
    request.patch('/update/1234')
      .send({
        blacklist: ''
      })
      .expect(422, done);
  });

});
