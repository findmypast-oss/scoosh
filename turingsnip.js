#!/usr/bin/env node
'use strict';
const _ = require('lodash');
const inquirer = require('inquirer');
const program = require('commander');
const clipboardy = require('clipboardy');
const expandTilde = require('expand-tilde');

const createVariableBlock = require('./src/create_variable_block');
const createSnippet = require('./src/create_snippet');
const getSnippetPath = require('./src/get_snippet_path');
const readConfig = require('./src/read_config');

const configNotPopulatedMessage =
`
In order to use turingsnip you'll need to register some tasty snippet repos
Edit the configuration file in ~/.turingsnip and add the paths to your repo
For Example :
{
  "snippetRepos": ["~/snippetRepo", "~/anotherSnippetRepo"]
}
`;
const couldNotFindSnippetMessage = 'Could not find the snippet in your snippet repositories.';
const snipAvailableMessage = 'Clipboard contains complete snippet.'

program
  .version('1.0.0')
  .command('clip <snippetName>')
  .description('Put the requested snippet on the clipboard')
  .action(pushSnippetToClipboard);

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
  return;
}

function pushSnippetToClipboard(snippetName) {
  const snippetsRepos = readConfig().snippetRepos
    .map(repo => expandTilde(repo));

  if ( _.isEmpty(snippetsRepos) ) {
    console.log(configNotPopulatedMessage);
    return;
  }
  let repoPath = _.find(snippetsRepos, (repo) => {
    return getSnippetPath(repo, snippetName);
  });
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
