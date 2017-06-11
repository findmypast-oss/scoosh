const chai = require('chai');
const expect = chai.expect;
const { renderSnippetToString } = require('./create_snippet');

describe('createSnippet', function() {
  it('returns a completed template', function() {
    const result = renderSnippetToString('testdata/snippets/ecmascript/titan/testsnippet.js', {
      VariableHere: 'String',
    });
    const expected = 'Before String After';
    expect(result).to.equal(expected);
  });
});
