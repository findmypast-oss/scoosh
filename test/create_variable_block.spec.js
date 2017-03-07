const assert = require('assert');
const chai = require('chai');
const expect = chai.expect;
const createVariableBlock = require('../src/create_variable_block');

describe('createVariableBlock', function() {
  it ('returns a completed variable block', function() {
    const result = createVariableBlock('testdata/snippets/ecmascript/newcomponent.json');
  });
});
