const _ = require('lodash');
const fs = require('fs');
const path = require('path');
//const pathLibrary = require('path');
const expandTilde = require('expand-tilde');

//const pathAlreadyExistsInConfig = 'Path already exists in config file.\n';

function readConfig() {
  let metadataString;

  const configPath = findConfig();
  if (configPath) {
    metadataString = fs.readFileSync(configPath + '/.scoosh').toString();
    if (metadataString == undefined) return undefined;
    const metadata = JSON.parse(metadataString);
    return metadata;
  } else {
    throw new Error('Could not find a .scoosh configuration file');
  }
}

function getSnippetsReposFromConfig(config) {
  const configPath = findConfig();
  const snippetsRepos = config.snippetFolders.map(repo => {
    const tildeFixedRepo = expandTilde(repo);
    const absolutePath = path.isAbsolute(tildeFixedRepo)
      ? tildeFixedRepo
      : path.normalize(configPath + '/' + tildeFixedRepo);
    return absolutePath;
  });
  if (_.isEmpty(snippetsRepos)) {
    return undefined;
  }
  return snippetsRepos;
}

function findConfig(relativePath = '') {
  var fullPath = path.isAbsolute(relativePath)
    ? relativePath
    : path.normalize(process.cwd() + '/' + relativePath);
  var lastFullPath = undefined;
  while (fullPath != lastFullPath) {
    if (fs.existsSync(`${fullPath}/.scoosh`)) {
      return fullPath;
    }
    lastFullPath = fullPath;
    fullPath = path.normalize(fullPath + '/..');
  }
  return undefined;
}

module.exports = {
  readConfig,
  findConfig,
  getSnippetsReposFromConfig
};
