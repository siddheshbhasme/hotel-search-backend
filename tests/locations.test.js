const chai = require('chai');
const chaiHttp = require('chai-http');
const axios = require('axios');
const tracer = require('tracer');
const { describe, it, before, after } = require('mocha');
const { stub } = require('sinon');
const { expect } = chai;

const app = require('../app');

chai.use(chaiHttp);

describe('API GET /locations - Positive Scenario', () => {
  before(() => {
    const expectedResponse = {
      data: {
        Response: {
          View: [
            {
              Result: [
                {
                  Location: {
                    DisplayPosition: {
                      Latitude: 48.13642,
                      Longitude: 11.57755
                    },
                    Address: {
                      Label: 'München, Bayern, Deutschland'
                    }
                  }
                }
              ]
            }
          ]
        }
      }
    };
    tracer.close();
    stub(axios, 'get').resolves(Promise.resolve(expectedResponse));
  });
  after(() => {
    axios.get.restore();
  });
  it('it should Get all locations', done => {
    chai
      .request(app)
      .get('/locations')
      .query({ query: 'munich' })
      .end((err, res) => {
        expect(err).to.be.equals(null);
        expect(res).to.have.status(200);
        expect(res.body.items).to.length(1);
        expect(res.body.items[0].DisplayPosition.Latitude).to.equals(48.13642);
        done();
      });
  });

  it('it should validate query params', done => {
    chai
      .request(app)
      .get('/locations')
      .end((err, res) => {
        expect(err).to.be.equals(null);
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal(400);
        expect(res.body.message).to.be.equal(
          'Location query is required for search to work'
        );
        done();
      });
  });
});

describe('GET /locations - Negative Scenarios - Without Response', () => {
  before(() => {
    const expectedError = {
      status: 400,
      message: 'Error occured'
    };
    tracer.close();
    stub(axios, 'get').rejects(expectedError);
  });
  after(() => {
    axios.get.restore();
  });
  it('it should return error 500', done => {
    chai
      .request(app)
      .get('/locations')
      .query({ query: 'munich' })
      .end((err, res) => {
        expect(err).to.be.equals(null);
        expect(res).to.have.status(500);
        expect(res.body.status).to.be.equal(500);
        expect(res.body.message).to.be.equal('Error occured');
        done();
      });
  });
});

describe('GET /locations - Negative Scenarios - With Response', () => {
  before(() => {
    const expectedError = {
      response: {
        data: { status: 400, message: 'Error occured' }
      }
    };
    tracer.close();
    stub(axios, 'get').rejects(expectedError);
  });
  after(() => {
    axios.get.restore();
  });
  it('it should return error 400', done => {
    chai
      .request(app)
      .get('/locations')
      .query({ query: 'munich' })
      .end((err, res) => {
        expect(err).to.be.equals(null);
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal(400);
        expect(res.body.message).to.be.equal('Error occured');
        done();
      });
  });
});

describe('GET /locations - Negative Scenarios - With Exception', () => {
  before(() => {
    const expectedError = { status: 500, message: 'Error occured' };
    tracer.close();
    stub(axios, 'get').throws(expectedError);
  });
  after(() => {
    axios.get.restore();
  });
  it('it should return error 500', done => {
    chai
      .request(app)
      .get('/locations')
      .query({ query: 'munich' })
      .end((err, res) => {
        expect(err).to.be.equals(null);
        expect(res).to.have.status(500);
        expect(res.body.status).to.be.equal(500);
        expect(res.body.message).to.be.equal('Error occured');
        done();
      });
  });
});
