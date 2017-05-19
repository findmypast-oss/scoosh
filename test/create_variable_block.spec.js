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
  describe('filterParametersPassedFromCommandLine removes already set variables from the inquirer questions', function() {
    it('removes a given command line parameter', function() {
      const questions = [{
        name: "ComponentName",
        type: "input",
        default: "<SPECIFYNAMEHERE>",
        message: "the component name of the blahdeblah"
      }];
      filterParametersPassedFromCommandLine({test: "test"}, questions).deepEqual([]);
    });
  });
});
