const fs = require('fs');
const path = require('path');
const { mkdirp } = require('mkdirp');

function commitGeneratedCode(generatedCode) {
  generatedCode.forEach(file => {
    mkdirp.sync(path.dirname(file.filepath));
    fs.writeFileSync(file.filepath, file.contents);
  });
  return '';
}

module.exports = { commitGeneratedCode };
