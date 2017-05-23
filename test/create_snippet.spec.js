const chai = require('chai');
const { describe, it } = require('mocha');
const expect = chai.expect;
const { createSnippet } = require('../src/create_snippet');

describe('createSnippet', function() {
  it('returns a completed template', function() {
    console.log(createSnippet);
    const result = createSnippet('testdata/snippets/ecmascript/titan/testsnippet.js', {
      VariableHere: 'String',
    });

    const expected = 'Before String After';
    expect(result).to.equal(expected);
  });
});
