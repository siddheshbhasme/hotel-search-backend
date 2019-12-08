const chai = require('chai');
const chaiHttp = require('chai-http');
const tracer = require('tracer');
const { describe, it, before, after } = require('mocha');
const { stub } = require('sinon');
const { expect } = chai;

const logger = require('../common/logger').getLogger();

chai.use(chaiHttp);

describe('Logger', () => {
  before(() => {
    tracer.setLevel('info');
    stub(console, 'log').returns(void 0);
  });

  after(() => {
    tracer.close();
    // eslint-disable-next-line no-console
    console.log.restore();
  });
  it('it should log message on console', done => {
    logger.info('ABCD');
    /* eslint-disable no-console */
    expect(console.log.called).to.be.equals(true);
    expect(console.log.callCount).to.be.equals(1);
    expect(console.log.getCall(0).args[0]).to.contains('ABCD');
    /* eslint-enable no-console */
    done();
  });
});
