const assert = require('assert');
const chai = require('chai');
const expect = chai.expect;
const createSnippet = require('../src/create_snippet');
const _ = require('lodash');

describe('createSnippet', function() {
  it ('returns a completed template', function() {
    const result = createSnippet(
      'snippets/ecmascript/titan/testsnippet.js',
      { VariableHere: 'String' });

    const expected = "Before String After";
    expect(result).to.equal(expected);
  });
});
