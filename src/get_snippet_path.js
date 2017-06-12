const fs = require('fs');
const path = require('path');
const walk = require('fs-walk');

function getSnippetNamesFromAllSnippetFolders(startingPath) {
  if (!fs.existsSync(startingPath)) {
    process.stdout.write(`Path cannot be found: ${startingPath}\n`);
    return undefined;
  }
  if (!startingPath) {
    return undefined;
  }
  let resultList = [];
  walk.walkSync(startingPath, function(basedir, filename) {
    if (filename.endsWith('.json')) {
      resultList.push(path.parse(filename).name);
    }
  });
  return resultList;
}

function getSnippetPath(startingPath, snippetName) {
  let returnDir = undefined;

  if (!fs.existsSync(startingPath)) {
    process.stdout.write(`Path cannot be found in : ${startingPath}\n`);
    return undefined;
  }
  if (!startingPath) {
    return undefined;
  }
  walk.walkSync(startingPath, function(basedir, filename) {
    if (filename === snippetName) {
      returnDir = basedir;
    }
    if (filename.startsWith(snippetName + '.json')) {
      returnDir = basedir;
    }
  });
  return returnDir;
}

module.exports = { getSnippetPath, getSnippetNamesFromAllSnippetFolders };
