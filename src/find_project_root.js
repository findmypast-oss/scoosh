const _ = require('lodash');
const fs = require('fs');
const ejs = require('ejs');

function getRelativePathToGitRoot() {
  const relativePath = execSync('git rev-parse --show-cdup');
  if (relativePath.startsWith('fatal:')) {
    return '';
  }
  return relativePath;
}

module.exports = {
  getRelativePathToGitRoot,
};
