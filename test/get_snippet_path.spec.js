var assert = require('assert');
var chai = require('chai');
var expect = chai.expect;
const { getSnippetPath } = require('../src/get_snippet_path');
const _ = require('lodash');

describe('find the filename in the current folder', function() {
  it('should find an existing file in the given path', function() {
    path = getSnippetPath('testdata/snippets', 'newcomponent');
    expect(path).to.equal('testdata/snippets/ecmascript');
  });
  it('should find an existing file when given a partial path', function() {
    getSnippetPath('testdata/snippets', 'ecmascript/newcomponent');
    expect(path).to.equal('testdata/snippets/ecmascript');
  });
  it('should find an existing file when an extension is present', function() {
    getSnippetPath('testdata/snippets', 'newcomponent.js');
    expect(path).to.equal('testdata/snippets/ecmascript');
  });
});
