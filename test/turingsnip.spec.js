const chai = require('chai');
const expect = chai.expect;
const { describe, it } = require('mocha');
const { varsToObject } = require('../src/turingsnip');

// const _ = require('lodash')

describe('varsToObject', () => {
  it('converts an array of parameters to an object', () => {
    const result = varsToObject(['hello=world', 'why=not']);
    expect(result).to.deep.equal({ hello: 'world', why: 'not' });
  });
});
