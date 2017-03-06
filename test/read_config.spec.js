var assert = require('assert');
var chai = require('chai');
var expect = chai.expect;
const getSnippetPath = require('../src/find_snippet');
const _ = require('lodash');

describe('find the filename in the current folder', function() {
  it ('should find an existing file in the given path', function() {
    path = getSnippetPath('newcomponent');
    expect(path).to.equal('snippets/ecmascript');
  });
  it ('should find an existing file when given a partial path', function() {
    getSnippetPath('ecmascript/newcomponent');
    expect(path).to.equal('snippets/ecmascript')
  });
  it ('should find an existing file when an extension is present', function() {
    getSnippetPath('newcomponent.js');
    expect(path).to.equal('snippets/ecmascript')
  });
});
