const chai = require('chai');
const expect = chai.expect;
const { varsToObject } = require('./map_vars_to_object');

describe('varsToObject', () => {
  it('converts an array of parameters to an object', () => {
    const result = varsToObject(['hello=world', 'why=not']);
    expect(result).to.deep.equal({ hello: 'world', why: 'not' });
  });
});
