const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const walk = require('fs-walk');


function getSnippetPath(startingPath, snippetName) {
  let returnDir = undefined;

  if (!fs.existsSync(startingPath)) {
      console.log('Path cannot be found in ~/.turingsnip : ' +
                  startingPath);
      return undefined;
  }
  if (!startingPath) {
    return undefined;
  }
  walk.walkSync(startingPath, function(basedir, filename, stat, next) {
    if (filename === snippetName)
    {
      returnDir = basedir;
    }
    if (filename.startsWith(snippetName + '.'))
    {
      returnDir = basedir;
    }
  });
  return returnDir;
}

module.exports = getSnippetPath;
