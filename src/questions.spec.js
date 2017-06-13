const chai = require('chai');

const {
  // inquireForMissingParams,
  // readGeneratedCodeConfiguration,
  filterExistingParameters,
} = require('./questions');

const expect = chai.expect;

// describe('inquireForMissingParams', () => {
//   it('returns a completed variable block', () => {
//     inquireForMissingParams({}, readGeneratedCodeConfiguration('testdata/snippets/ecmascript/newcomponent.json'), answers => {
//       expect(answers).to.exist();
//     });
//   });
// });
describe('filterExistingParameters removes already set variables from the inquirer questions', () => {
  it('removes a given command line parameter ', () => {
    const questions = [
      {
        name: 'ComponentName',
        type: 'input',
        default: '<SPECIFYNAMEHERE>',
        message: 'the component name of the blahdeblah',
      },
    ];
    const actual = filterExistingParameters({ ComponentName: 'test' }, questions);
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
    const actual = filterExistingParameters({ Name: 'test' }, questions);
    expect(actual).to.deep.equal(questions);
  });
});
