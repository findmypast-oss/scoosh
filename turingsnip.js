#!/usr/bin/env node
'use strict';
const _ = require('lodash');
const inquirer = require('inquirer');
const program = require('commander');
const clipboardy = require('clipboardy');
const expandTilde = require('expand-tilde');
const pathLibrary = require('path');
const fs = require('fs');


const {createVariableBlock,readSnippetConfiguration} = require('./src/create_variable_block');
const {createSnippet, renderTemplateString} = require('./src/create_snippet');
const {getSnippetPath,getSnippetNamesFromAllSnippetFolders} = require('./src/get_snippet_path');
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

const config = readConfig();

program
  .version('1.0.0')

program.command('clip [snippetName]')
  .description('Put the requested snippet on the clipboard')
  .action((name = undefined) => {
    if (!name) {
      interactive_choose_snippet( (snippetName) => {
        const result = pushSnippetToFunction(config, snippetName, clipboardy.writeSync);
      });
    } else {
      const result = pushSnippetToFunction(config, name, clipboardy.writeSync);
    }
  });

program.command('debug <snippetName>')
  .description('Put the requested snippet on the console')
  .action((name) => {
    pushSnippetToFunction(config, name, console.log);
  });

function createFilesForSnippet(snippetName) {
  pushSnippetToFunction(config, snippetName,
    (snippet,filename = undefined) => {
      if (filename) {
        fs.writeFileSync(filename, snippet+"\n");
        console.log("Created snippet file");
      }
  });
}

program.command('create [snippetName]')
  .description('Create files for snippet.')
  .action((snippetName = undefined) => {
    if (!snippetName) {
      interactive_choose_snippet( (snippetName) => {
        createFilesForSnippet(snippetName);
      });
    } else {
      createFilesForSnippet(snippetName);
    }
  });

program.command('list')
  .description('Creates a list of available snippets')
  .action(listSnippets);

program.command('addfolder <folderPath>')
  .description('Adds the path to the list of available snippet folders')
  .action(addFolderToConfig);


program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
  return;
}

function addFolderToConfig(rawPath) {
  const path = pathLibrary.resolve(rawPath);
  const config = readConfig();
  const repoMatch = _.find(config.snippetFolders,
    repo => repo === path);
  if (!repoMatch)
  {
    config.snippetFolders.push(path);
    const jsonConfig = writeConfig(config);
    console.log("Config Updated in ~/.turingsnip\n" + jsonConfig);
  } else {
    console.log(pathAlreadyExistsInConfig);
  }
}

function getSnippetsReposFromConfig(config) {
  const snippetsRepos = config.snippetFolders
    .map(repo => expandTilde(repo));

  if ( _.isEmpty(snippetsRepos) ) {
    return undefined;
  }
  return snippetsRepos;
}
function getAllSnippets() {
  const snippetsRepos = getSnippetsReposFromConfig(config);
  if (!snippetsRepos) {
    console.log(configNotPopulatedMessage);
  }
  let allSnippets = [];
  let repoPath = _.find(snippetsRepos,
    repo => {
      allSnippets.push.apply(allSnippets,getSnippetNamesFromAllSnippetFolders(repo));
    }
  );
  return allSnippets;
}
function listSnippets() {
  const allSnippets = getAllSnippets();

  console.log(JSON.stringify(allSnippets,undefined,2));
}
function interactive_choose_snippet(apply) {
  const allSnippets = getAllSnippets();

  const questions =
    {
      name: "ChooseSnippet",
      type: "list",
      choices: allSnippets,
      "message": "Please select the snippet that you want."
    }
  inquirer.prompt(questions).then(function (answers) {
    apply(answers.ChooseSnippet);
  });
}

function searchForSnippetInRepos(snippetsRepos, snippetName) {
  let repoPath = _.find(snippetsRepos,
    repo => getSnippetPath(repo, snippetName) );

  repoPath = getSnippetPath(repoPath, snippetName);
  return repoPath;
}

function pushSnippetToFunction(config, snippetName, apply) {

  const snippetsRepo = getSnippetsReposFromConfig(config);
  if (!snippetsRepo) {
    console.log(configNotPopulatedMessage);
  }
  const repoPath = searchForSnippetInRepos(snippetsRepo, snippetName);

  if (repoPath)
  {
    const snippetConfiguration = readSnippetConfiguration(`${repoPath}/${snippetName}.json`)

    createVariableBlock(
      snippetConfiguration,
      (answers, templateName) => {

        _.forEach(snippetConfiguration.templateFiles, (templateMetadata) => {
          const snippet = createSnippet(`${repoPath}/${templateMetadata.template}`,answers);

          if (templateMetadata.filename) {
            const filename = renderTemplateString(templateMetadata.filename,answers);

            console.log(filename);
            apply(snippet, filename);
          } else {
            apply(snippet);
          }
        });
      });
  } else {
    console.log(couldNotFindSnippetMessage);
  }

}
