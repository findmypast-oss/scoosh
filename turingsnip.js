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

program
  .version('1.0.0')
  .command('clip <req>', 'Put the requested snippet on the clipboard')
  .action(pushSnippetToClipboard);

program.parse(process.argv);
console.log("after parse");
if (!process.argv.slice(2).length) {
  program.outputHelp(colors.red);
}

function pushSnippetToClipboard(req,optional) {
  const snippetsRepos = readConfig().snippetRepos
    .map(repo => expandTilde(repo));

  if ( _.isEmpty(snippetsRepos) ) {
    console.log(configNotPopulatedMessage);
    return;
  }
  let repoPath = _.find(snippetsRepos, (repo) => {
    return getSnippetPath(repo, req);
  });
  repoPath = getSnippetPath(repoPath, req);

  console.log("back in the main loop : " + repoPath);
  if (repoPath)
  {
    console.log("createVariableBlock");
    createVariableBlock(
      `${repoPath}/${req}.json`,
      (answers, templateName) => {
        const snippet = createSnippet(`${repoPath}/${templateName}`,answers);
        clipboardy.writeSync(snippet);
      });
  }
  return true;
}
