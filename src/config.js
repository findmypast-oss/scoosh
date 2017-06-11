const _ = require('lodash');
const fs = require('fs');
const path = require('path');
//const pathLibrary = require('path');
const expandTilde = require('expand-tilde');
const { findTuringSnipConfig } = require('./find-turingsnip-config');

const configFilePath = `${process.env.HOME}/.turingsnip`;
//const pathAlreadyExistsInConfig = 'Path already exists in config file.\n';

function readConfig() {
  let metadataString;

  const configPath = findTuringSnipConfig();
  console.log(configPath);

  metadataString = fs.readFileSync(configPath + '/.turingsnip').toString();
  if (metadataString == undefined) return undefined;
  const metadata = JSON.parse(metadataString);
  console.log(metadata);
  return metadata;
}

function writeConfig(config) {
  const metadataString = JSON.stringify(config, undefined, 2);
  fs.writeFileSync(configFilePath, `${metadataString}\n`);
  return metadataString;
}

function getSnippetsReposFromConfig(pathToConfig, config) {
  const snippetsRepos = config.snippetFolders.map(repo => {
    path.resolve(repo);
    expandTilde(repo);
  });

  if (_.isEmpty(snippetsRepos)) {
    return undefined;
  }
  console.log(snippetsRepos);
  return snippetsRepos;
}

module.exports = {
  readConfig,
  writeConfig,
  getSnippetsReposFromConfig,
};
