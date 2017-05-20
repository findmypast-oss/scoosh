const _ = require('lodash');
const fs = require('fs');
const pathLibrary = require('path');
const expandTilde = require('expand-tilde');

const configFilePath = `${process.env.HOME}/.turingsnip`;
function readConfig() {
  let metadataString;
  if (!fs.existsSync(configFilePath)) {
    metadataString = writeConfig({ snippetFolders: [] });
  } else {
    metadataString = fs.readFileSync(configFilePath).toString();
  }
  const metadata = JSON.parse(metadataString);

  return metadata;
}

function writeConfig(config) {
  const metadataString = JSON.stringify(config, undefined, 2);
  fs.writeFileSync(configFilePath, `${metadataString}\n`);
  return metadataString;
}

function addFolderToConfig(rawPath) {
  const path = pathLibrary.resolve(rawPath);
  const config = readConfig();
  const repoMatch = _.find(config.snippetFolders, repo => repo === path);
  if (!repoMatch) {
    config.snippetFolders.push(path);
    const jsonConfig = writeConfig(config);
    console.log(`Config Updated in ~/.turingsnip\n${jsonConfig}`);
  } else {
    console.log(pathAlreadyExistsInConfig);
  }
}

function getSnippetsReposFromConfig(config) {
  const snippetsRepos = config.snippetFolders.map(repo => expandTilde(repo));

  if (_.isEmpty(snippetsRepos)) {
    return undefined;
  }
  return snippetsRepos;
}

module.exports = { readConfig, writeConfig, addFolderToConfig, getSnippetsReposFromConfig };
