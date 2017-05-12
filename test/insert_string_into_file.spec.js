var assert = require('assert');
var chai = require('chai');
var expect = chai.expect;
const {
  insertStringIntoFile,
  insertStringIntoStringAtMarker,
  getListOfFilesWithMarker} = require('../src/insert_string_into_file');

const _ = require('lodash');

describe('when the file does not contain the marker return failure', function() {
  it ('when the path does not exist return false', function() {
    const result = insertStringIntoFile('testdata/doesnotexist.js',
      'MARKER','STRING');
    expect(result).to.equal(false);
  });
  it ('inserts a string after the marker.', function() {
    const result = insertStringIntoStringAtMarker(
      'function() {\nMARKER\n}\n','MARKER','HOW ABOUT THIS\n');

    expect(result).to.equal('function() {\nMARKER\nHOW ABOUT THIS\n}\n');
  });
});

describe('Find all files with a given marker', function() {
  it ('Returns all files with a marker existing in two files.', function() {
    const result = getListOfFilesWithMarker('testdata/snippets',
      'ComponentName');
    expect(result).to.have.lengthOf(2);
  });
  it ('Returns all files with the marker.', function() {
    const result = getListOfFilesWithMarker('testdata/snippets',
      '// <%- InterestingList %>');
    console.log(result);
    expect(result).to.have.lengthOf(1);
  });
});
