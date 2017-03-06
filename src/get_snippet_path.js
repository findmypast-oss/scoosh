const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const walk = require('fs-walk');


function getSnippetPath(startingPath, snippetName) {
  let returnDir = undefined;

  if (!startingPath) {
    return undefined;
  }
  walk.walkSync(startingPath, function(basedir, filename, stat, next) {

    if (filename === snippetName)
    {
      returnDir = basedir;
    }
    if (filename.startsWith(snippetName + "."))
    {
      returnDir = basedir;
    }
  });
  console.log(returnDir);
  return returnDir;
}

module.exports = getSnippetPath;
