const chai = require('chai');
const expect = chai.expect;

const sut = require('./generated-code-display');

describe('generated code tests', function() {
  it('returns an empty string if there is no generation', function() {
    const result = sut.humanReadableGeneratedCode([]);
    expect(result).to.be.a('string');
    expect(result).to.be.equal('');
  });
  it('generates text for a single entry', function() {
    const generatedCode = [
      {
        filepath: 'hello.js',
        contents: 'This is the file we want to write',
      },
    ];

    const result = sut.humanReadableGeneratedCode(generatedCode);
    expect(result).to.be.a('string');
    expect(result).to.be.equal(
      'File to create: hello.js\n' +
        'This is the file we want to write\n' +
        '-----------------------------------------------\n'
    );
  });
  it('generates text for a single entry', function() {
    const generatedCode = [
      {
        filepath: 'hello.js',
        contents: 'This is the file we want to write',
      },
      {
        filepath: 'blast.js',
        contents: 'This is another file we want to write',
      },
    ];

    const result = sut.humanReadableGeneratedCode(generatedCode);
    expect(result).to.be.a('string');
    expect(result).to.be.equal(
      'File to create: hello.js\n' +
        'This is the file we want to write\n' +
        '-----------------------------------------------\n' +
        'File to create: blast.js\n' +
        'This is another file we want to write\n' +
        '-----------------------------------------------\n'
    );
  });
});
