var chai = require('chai');
var expect = chai.expect;
const { getSnippetPath } = require('./get_snippet_path');
const { describe, it } = require('mocha');

describe('find the filename in the current folder', function() {
  it('should find an existing file in the given path', function() {
    const path = getSnippetPath('testdata/snippets', 'newcomponent');
    expect(path).to.equal('testdata/snippets/ecmascript');
  });
  it('should find an existing file when an extension is present', function() {
    const path = getSnippetPath('testdata/snippets', 'newcomponent.js');
    expect(path).to.equal('testdata/snippets/ecmascript');
  });
});
