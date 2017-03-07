#!/usr/bin/env node
'use strict';
const _ = require('lodash');
const inquirer = require('inquirer');
const program = require('commander');
const clipboardy = require('clipboardy');
const expandTilde = require('expand-tilde');
const pathLibrary = require('path');

const createVariableBlock = require('./src/create_variable_block');
const createSnippet = require('./src/create_snippet');
const getSnippetPath = require('./src/get_snippet_path');
const {readConfig,writeConfig} = require('./src/read_config');


const configNotPopulatedMessage =
`
In order to use turingsnip you'll need to register some tasty snippet folders
Edit the configuration file in ~/.turingsnip and add the paths
For Example :
{
  "snippetFolders": ["~/snippetFolder", "~/anotherSnippetFolder"]
}
`;
const couldNotFindSnippetMessage = 'Could not find the snippet in your snippet folders.';
const snipAvailableMessage = 'Clipboard contains complete snippet.'
const pathAlreadyExistsInConfig = 'Path already exists in config file.'


program
  .version('1.0.0')

program.command('clip <snippetName>')
  .description('Put the requested snippet on the clipboard')
  .action(pushSnippetToClipboard);

program.command('addfolder <folderPath>')
  .description('Adds the path to the list of available snippet folders')
  .action(addFolderToConfig);


program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
  return;
}

function addFolderToConfig(rawPath) {
  const path = '/' + pathLibrary.relative('/', rawPath);
  const config = readConfig();
  const repoMatch = _.find(config.snippetFolders,
    repo => repo === path);
  if (!repoMatch)
  {
    config.snippetFolders.push(path);
    const jsonConfig = writeConfig(config);
    console.log("Config Updated\n" + jsonConfig);
  } else {
    console.log(pathAlreadyExistsInConfig);
  }
}

function pushSnippetToClipboard(snippetName) {
  const snippetsRepos = readConfig().snippetFolders
    .map(repo => expandTilde(repo));

  if ( _.isEmpty(snippetsRepos) ) {
    console.log(configNotPopulatedMessage);
    return;
  }
  let repoPath = _.find(snippetsRepos,
    repo => getSnippetPath(repo, snippetName) );

  repoPath = getSnippetPath(repoPath, snippetName);

  if (repoPath)
  {
    createVariableBlock(
      `${repoPath}/${snippetName}.json`,
      (answers, templateName) => {
        const snippet = createSnippet(`${repoPath}/${templateName}`,answers);
        clipboardy.writeSync(snippet);
        console.log(snipAvailableMessage);
      });
  } else {
    console.log(couldNotFindSnippetMessage);
  }

}
