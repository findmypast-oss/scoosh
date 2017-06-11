const fs = require('fs');
const path = require('path');

function findTuringSnipConfig(relativePath = '') {
  var fullPath = path.isAbsolute(relativePath) ? relativePath : path.normalize(process.cwd() + '/' + relativePath);
  var lastFullPath = undefined;
  while (fullPath != lastFullPath) {
    if (fs.existsSync(`${fullPath}/.turingsnip`)) {
      return fullPath;
    }
    lastFullPath = fullPath;
    fullPath = path.normalize(fullPath + '/..');
  }
  return undefined;
}

module.exports = {
  findTuringSnipConfig,
};
