const chai = require('chai');
const expect = chai.expect;
const fs = require('fs-extra');
const uuidV1 = require('uuid/v1');

const sut = require('./generated-code-processing');

describe('commit', function() {
  const testFolder = uuidV1();
  before(function() {
    if (!fs.existsSync(testFolder)) {
      fs.mkdirSync(testFolder);
    }
  });
  after(function() {
    if (fs.existsSync(testFolder)) {
      fs.removeSync(testFolder);
    }
  });
  it('creates and overwrites the files.', function() {
    const generatedCode = [
      {
        filepath: `${testFolder}/anotherfolder/andanother/hello.js`,
        contents: 'This is the file we want to write'
      },
      {
        filepath: `${testFolder}/blast.js`,
        contents: 'This is another file we want to write'
      }
    ];

    sut.commit(generatedCode);
    expect(fs.existsSync(`${testFolder}/anotherfolder/andanother/hello.js`)).to
      .be.true;
    expect(fs.existsSync(`${testFolder}/blast.js`)).to.be.true;
    sut.commit(generatedCode);
    expect(fs.existsSync(`${testFolder}/anotherfolder/andanother/hello.js`)).to
      .be.true;
    expect(fs.existsSync(`${testFolder}/blast.js`)).to.be.true;
  });
});

describe('prettify', function() {
  it('returns an empty string if there is no generation', function() {
    const result = sut.prettify([]);
    expect(result).to.be.a('string');
    expect(result).to.be.equal('');
  });
  it('generates text for a single entry', function() {
    const generatedCode = [
      {
        filepath: 'hello.js',
        contents: 'This is the file we want to write'
      }
    ];

    const result = sut.prettify(generatedCode);
    expect(result).to.be.a('string');
    expect(result).to.be.equal(
      'File to create: hello.js\n' +
        '-----------------------------------------------\n' +
        'This is the file we want to write\n' +
        '-----------------------------------------------\n'
    );
  });
  it('generates text for a single entry', function() {
    const generatedCode = [
      {
        filepath: 'hello.js',
        contents: 'This is the file we want to write'
      },
      {
        filepath: 'blast.js',
        contents: 'This is another file we want to write'
      }
    ];

    const result = sut.prettify(generatedCode);
    expect(result).to.be.a('string');
    expect(result).to.be.equal(
      'File to create: hello.js\n' +
        '-----------------------------------------------\n' +
        'This is the file we want to write\n' +
        '-----------------------------------------------\n' +
        'File to create: blast.js\n' +
        '-----------------------------------------------\n' +
        'This is another file we want to write\n' +
        '-----------------------------------------------\n'
    );
  });
});
