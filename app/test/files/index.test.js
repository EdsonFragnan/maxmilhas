'use strict';

describe('GET /', (done) => {

  it('Return status of route.', (done) => {
    request.get('/')
      .expect(404)
      .end((err, res) => {
        done(err);
      });
  });

  it('Return status of route.', (done) => {
    request.post('/')
      .expect(404)
      .end((err, res) => {
        done(err);
      });
  });

  it('Return status of route.', (done) => {
    request.delete('/')
      .expect(404)
      .end((err, res) => {
        done(err);
      });
  });

  it('Return status of route.', (done) => {
    request.put('/')
      .expect(404)
      .end((err, res) => {
        done(err);
      });
  });

  it('Return status of route.', (done) => {
    request.patch('/')
      .expect(404)
      .end((err, res) => {
        done(err);
      });
  });
});