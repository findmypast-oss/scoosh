const chai = require('chai');
const expect = chai.expect;

const sut = require('./generated-code-display');

describe('generated code tests', function() {
  it('returns an empty string if there is no generation', function() {
    const generatedCode = [
      {
        filepath: 'hello.js',
        contents: 'This is the file we want to write',
      },
    ];

    const result = sut.humanReadableGeneratedCode(generatedCode);
    expect(result).to.be.a('string');
  });
});
