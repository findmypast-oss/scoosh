const assert = require('assert');
const chai = require('chai');
const expect = chai.expect;
const {createVariableBlock, readSnippetConfiguration} = require('../src/create_variable_block');

describe('createVariableBlock', function() {
  it ('returns a completed variable block', function() {

    const result = createVariableBlock(
      readSnippetConfiguration('testdata/snippets/ecmascript/newcomponent.json'),
      (answers, templateFile) => { expect(answers).to.exist() });
  });
});
