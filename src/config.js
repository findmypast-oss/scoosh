const _ = require('lodash');
const fs = require('fs');
const path = require('path');
//const pathLibrary = require('path');
const expandTilde = require('expand-tilde');
const { findTuringSnipConfig } = require('./find-turingsnip-config');

//const pathAlreadyExistsInConfig = 'Path already exists in config file.\n';

function readConfig() {
  let metadataString;

  const configPath = findTuringSnipConfig();

  metadataString = fs.readFileSync(configPath + '/.scoosh').toString();
  if (metadataString == undefined) return undefined;
  const metadata = JSON.parse(metadataString);
  return metadata;
}

function getSnippetsReposFromConfig(config) {
  const configPath = findTuringSnipConfig();
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

module.exports = {
  readConfig,
  getSnippetsReposFromConfig,
};
