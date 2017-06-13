const fs = require('fs');
const path = require('path');
const { mkdirp } = require('mkdirp');

function commit(generatedCode) {
  generatedCode.forEach(file => {
    mkdirp.sync(path.dirname(file.filepath));
    fs.writeFileSync(file.filepath, file.contents);
  });
  return '';
}

function prettify(generatedCode) {
  const barString = '\n-----------------------------------------------\n';
  const humanReadable = generatedCode.reduce((returnString, contents) => {
    const description = `File to create: ${contents.filepath}${barString}${contents.contents}`;
    return returnString + description + barString;
  }, '');
  return humanReadable;
}

module.exports = { commit, prettify };
