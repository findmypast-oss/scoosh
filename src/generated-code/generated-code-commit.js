const fs = require('fs');
const path = require('path');
const { mkdirp } = require('mkdirp');

function commitGeneratedCode(generatedCode) {
  generatedCode.forEach(file => {
    mkdirp.sync(path.dirname(file.filepath));
    fs.writeFile(file.filepath, file.contents, err => {
      if (err) throw err;
    });
  });
  return '';
}

module.exports = { commitGeneratedCode };
