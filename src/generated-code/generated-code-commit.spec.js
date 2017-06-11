const chai = require('chai');
var fs = require('fs-extra');
const expect = chai.expect;
const uuidV1 = require('uuid/v1');
const sut = require('./generated-code-commit');

describe('generated code tests', function() {
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
        contents: 'This is the file we want to write',
      },
      {
        filepath: `${testFolder}/blast.js`,
        contents: 'This is another file we want to write',
      },
    ];

    sut.commitGeneratedCode(generatedCode);
    expect(fs.existsSync(`${testFolder}/anotherfolder/andanother/hello.js`)).to
      .be.true;
    expect(fs.existsSync(`${testFolder}/blast.js`)).to.be.true;
    sut.commitGeneratedCode(generatedCode);
    expect(fs.existsSync(`${testFolder}/anotherfolder/andanother/hello.js`)).to
      .be.true;
    expect(fs.existsSync(`${testFolder}/blast.js`)).to.be.true;
  });
});
