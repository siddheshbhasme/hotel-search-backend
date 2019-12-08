const chai = require('chai');
const chaiHttp = require('chai-http');
const { describe, it } = require('mocha');
const { expect } = chai;

const app = require('../app');

chai.use(chaiHttp);

describe('Application tests', () => {
  it('starts and shows the index page', done => {
    chai
      .request(app)
      .get('/')
      .end((err, res) => {
        expect(err).to.be.equals(null);
        expect(res).to.have.status(200);
        expect(res.text.indexOf('<html>') !== -1);
        done();
      });
  });

  it('shows a 404 HTML page', done => {
    chai
      .request(app)
      .get('/nowhere')
      .end((err, res) => {
        expect(err).to.be.equals(null);
        expect(res).to.have.status(404);
        expect(res.text.indexOf('<html>') !== -1);
        done();
      });
  });

  it('shows a swagger doc page', done => {
    chai
      .request(app)
      .get('/api-docs')
      .end((err, res) => {
        expect(err).to.be.equals(null);
        expect(res).to.have.status(200);
        expect(res.text.indexOf('swagger') !== -1);
        done();
      });
  });
});
