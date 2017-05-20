const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const walk = require('fs-walk');

function getSnippetNamesFromAllSnippetFolders(startingPath) {
  let returnDir = undefined;
  if (!fs.existsSync(startingPath)) {
    console.log('Path cannot be found in ~/.turingsnip : ' + startingPath);
    return undefined;
  }
  if (!startingPath) {
    return undefined;
  }
  let resultList = [];
  walk.walkSync(startingPath, function(basedir, filename, stat, next) {
    if (filename.endsWith('.json')) {
      resultList.push(path.parse(filename).name);
    }
  });
  return resultList;
}

function getSnippetPath(startingPath, snippetName) {
  let returnDir = undefined;

  if (!fs.existsSync(startingPath)) {
    console.log('Path cannot be found in ~/.turingsnip : ' + startingPath);
    return undefined;
  }
  if (!startingPath) {
    return undefined;
  }
  walk.walkSync(startingPath, function(basedir, filename, stat, next) {
    if (filename === snippetName) {
      returnDir = basedir;
    }
    if (filename.startsWith(snippetName + '.')) {
      returnDir = basedir;
    }
  });
  return returnDir;
}

module.exports = { getSnippetPath, getSnippetNamesFromAllSnippetFolders };
