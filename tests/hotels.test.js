const chai = require('chai');
const chaiHttp = require('chai-http');
const axios = require('axios');
const tracer = require('tracer');
const { describe, it } = require('mocha');
const { stub } = require('sinon');
const { expect } = chai;

const app = require('../app');

chai.use(chaiHttp);

describe('API GET /hotels - Positive Scenarios - Without Token', () => {
  before(() => {
    expectedResponse = {
      status: 200,
      data: {
        results: {
          next: ';context=nexttoken?',
          items: [
            { position: [48.13505, 11.58183], distance: 6, title: 'Isartor' }
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
  it('it should Get all locations without token', done => {
    chai
      .request(app)
      .get('/hotels')
      .query({ lat: '48.1351', long: '11.5818' })
      .end((err, res) => {
        expect(err).to.null;
        expect(res).to.have.status(200);
        expect(res.body.items).to.length(1);
        expect(res.body.nextToken).to.be.equal('nexttoken');
        done();
      });
  });
});

describe('GET /hotels - Positive Scenarios - With Token', () => {
  before(() => {
    expectedResponse = {
      status: 200,
      data: {
        next: ';context=nexttoken?',
        items: [
          { position: [48.13505, 11.58183], distance: 6, title: 'Isartor' }
        ]
      }
    };
    tracer.close();
    stub(axios, 'get').resolves(Promise.resolve(expectedResponse));
  });
  after(() => {
    axios.get.restore();
  });
  it('it should Get locations as per the token', done => {
    chai
      .request(app)
      .get('/hotels')
      .query({ lat: '48.1351', long: '11.5818', token: '123' })
      .end((err, res) => {
        expect(err).to.null;
        expect(res).to.have.status(200);
        expect(res.body.items).to.length(1);
        expect(res.body.nextToken).to.be.equal('nexttoken');
        done();
      });
  });
});

describe('GET /hotels - Negative Scenarios - Without Response', () => {
  before(() => {
    expectedError = {
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
      .get('/hotels')
      .query({ lat: '48.1351', long: '11.5818' })
      .end((err, res) => {
        expect(err).to.null;
        expect(res).to.have.status(500);
        expect(res.body.status).to.be.equal(500);
        expect(res.body.message).to.be.equal('Error occured');
        done();
      });
  });
});

describe('GET /hotels - Negative Scenarios - With Response', () => {
  before(() => {
    expectedError = {
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
      .get('/hotels')
      .query({ lat: '48.1351', long: '11.5818' })
      .end((err, res) => {
        expect(err).to.null;
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal(400);
        expect(res.body.message).to.be.equal('Error occured');
        done();
      });
  });
});

describe('GET /hotels - Negative Scenarios - With Exception', () => {
  before(() => {
    expectedError = { status: 500, message: 'Error occured' };
    tracer.close();
    stub(axios, 'get').throws(expectedError);
  });
  after(() => {
    axios.get.restore();
  });
  it('it should return error 500', done => {
    chai
      .request(app)
      .get('/hotels')
      .query({ lat: '48.1351', long: '11.5818' })
      .end((err, res) => {
        expect(err).to.null;
        expect(res).to.have.status(500);
        expect(res.body.status).to.be.equal(500);
        expect(res.body.message).to.be.equal('Error occured');
        done();
      });
  });
});
