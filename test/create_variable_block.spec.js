const chai = require('chai');

const {
  createVariableBlock,
  readSnippetConfiguration,
  filterParametersPassedFromCommandLine,
} = require('../src/create_variable_block');

const expect = chai.expect;

describe('createVariableBlock', () => {
  it('returns a completed variable block', () => {
    createVariableBlock(
      {},
      readSnippetConfiguration('testdata/snippets/ecmascript/newcomponent.json'),
      (answers, templateFile) => {
        expect(answers).to.exist();
      }
    );
  });
});
describe('filterParametersPassedFromCommandLine removes already set variables from the inquirer questions', () => {
  it('removes a given command line parameter ', () => {
    const questions = [
      {
        name: 'ComponentName',
        type: 'input',
        default: '<SPECIFYNAMEHERE>',
        message: 'the component name of the blahdeblah',
      },
    ];
    const actual = filterParametersPassedFromCommandLine({ ComponentName: 'test' }, questions);
    expect(actual).to.be.empty;
  });
  it('does not remove when no command line parameters match', () => {
    const questions = [
      {
        name: 'ComponentName',
        type: 'input',
        default: '<SPECIFYNAMEHERE>',
        message: 'the component name of the blahdeblah',
      },
    ];
    const actual = filterParametersPassedFromCommandLine({ Name: 'test' }, questions);
    expect(actual).to.deep.equal(questions);
  });
});
