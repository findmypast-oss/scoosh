const chai = require('chai');
const expect = chai.expect;
var fs = require('fs-extra');
const mkdirp = require('mkdirp');
const sut = require('./find-turingsnip-config');
const uuidV1 = require('uuid/v1');
const path = require('path');

describe('Check the directory walker finds our config', function() {
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

  it('Create some folders and a file and walk to it', function() {
    mkdirp.sync(`${testFolder}/path1/path2/path3/path4/path5`);
    fs.writeFileSync(`${testFolder}/path1/path2/.scoosh`, 'hello');
    const result = sut.findTuringSnipConfig(`${testFolder}/path1/path2/path3/path4/path5`);
    expect(result).to.equal(path.normalize(process.cwd() + '/' + `${testFolder}/path1/path2`));
  });
});
