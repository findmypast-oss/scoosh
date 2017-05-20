const chai = require('chai');
const { varsToObject } = require('../turingsnip');

const expect = chai.expect;
// const _ = require('lodash')

describe('varsToObject', () => {
  it('converts an array of parameters to an object', () => {
    const result = varsToObject(['hello=world', 'why=not']);
    expect(result).to.deep.equal({ hello: 'world', why: 'not' });
  });
});
