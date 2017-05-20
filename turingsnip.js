#!/usr/bin/env node

const _ = require('lodash');
const inquirer = require('inquirer');
const program = require('commander');
const clipboardy = require('clipboardy');

const fs = require('fs');

const { createVariableBlock, readSnippetConfiguration } = require('./src/create_variable_block');
const { createSnippet, renderTemplateString } = require('./src/create_snippet');
const { getSnippetPath, getSnippetNamesFromAllSnippetFolders } = require('./src/get_snippet_path');
const { readConfig, addFolderToConfig, getSnippetsReposFromConfig } = require('./src/config');

const configNotPopulatedMessage = `
In order to use turingsnip you'll need to register some tasty snippet folders
Edit the configuration file in ~/.turingsnip and add the paths
For Example :
{
  "snippetFolders": ["~/snippetFolder", "~/anotherSnippetFolder"]
}
`;
const couldNotFindSnippetMessage = 'Could not find the snippet in your snippet folders.';
const snipAvailableMessage = 'Clipboard contains complete snippet.';
const pathAlreadyExistsInConfig = 'Path already exists in config file.';

const config = readConfig();

program.version('1.0.0');

program
  .command('clip [snippetName]')
  .description('Put the requested snippet on the clipboard')
  .action((name = undefined) => {
    if (!name) {
      interactive_choose_snippet((snippetName) => {
        pushSnippetToFunction(config, snippetName, clipboardy.writeSync);
      });
    } else {
      pushSnippetToFunction(config, name, clipboardy.writeSync);
    }
  });

program
  .command('debug <snippetName>')
  .description('Put the requested snippet on the console')
  .action((name) => {
    pushSnippetToFunction(config, name, console.log);
  });

function createFilesForSnippet(snippetName) {
  pushSnippetToFunction(config, snippetName, (snippet, filename = undefined) => {
    if (filename) {
      fs.writeFileSync(filename, `${snippet}\n`);
      console.log('Created snippet file');
    }
  });
}

function varsToObject(variables) {
  const resultMap = {};
  variables.forEach((variable) => {
    const splitVar = variable.split('=');
    if (splitVar.length <= 1) {
      console.log(variable);
      console.log('variables should be in the form key=value');
    }
    if (splitVar.length > 2) {
      console.log(variable);
      console.log('variables definitions cannot include = signs.');
    }
    resultMap[splitVar[0]] = splitVar[1];
  });
  return resultMap;
}

program
  .command('create [snippetName]')
  .description('Create files for snippet.')
  .option('-v, --vars <vars...>', 'key value variables')
  .action((snippetName = undefined) => {
    if (!snippetName) {
      interactive_choose_snippet((snippetName) => {
        createFilesForSnippet(snippetName);
      });
    } else {
      createFilesForSnippet(snippetName);
    }
  });

program.command('list').description('Creates a list of available snippets').action(listSnippets);

program
  .command('addfolder <folderPath>')
  .description('Adds the path to the list of available snippet folders')
  .action(addFolderToConfig);

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}

function getAllSnippets() {
  const snippetsRepos = getSnippetsReposFromConfig(config);
  if (!snippetsRepos) {
    console.log(configNotPopulatedMessage);
  }
  const allSnippets = [];
  _.find(snippetsRepos, (repo) => {
    allSnippets.push(...getSnippetNamesFromAllSnippetFolders(repo));
  });
  return allSnippets;
}
function listSnippets() {
  const allSnippets = getAllSnippets();

  console.log(JSON.stringify(allSnippets, undefined, 2));
}

function interactive_choose_snippet(apply) {
  const allSnippets = getAllSnippets();

  const questions = {
    name: 'ChooseSnippet',
    type: 'list',
    choices: allSnippets,
    message: 'Please select the snippet that you want.',
  };
  inquirer.prompt(questions).then((answers) => {
    apply(answers.ChooseSnippet);
  });
}

function searchForSnippetInRepos(snippetsRepos, snippetName) {
  let repoPath = _.find(snippetsRepos, repo => getSnippetPath(repo, snippetName));

  repoPath = getSnippetPath(repoPath, snippetName);
  return repoPath;
}

function pushSnippetToFunction(config, snippetName, apply, commandLineParameters) {
  const snippetsRepo = getSnippetsReposFromConfig(config);
  if (!snippetsRepo) {
    console.log(configNotPopulatedMessage);
  }
  const repoPath = searchForSnippetInRepos(snippetsRepo, snippetName);

  if (repoPath) {
    const snippetConfiguration = readSnippetConfiguration(`${repoPath}/${snippetName}.json`);

    createVariableBlock(commandLineParameters, snippetConfiguration, (answers, templateName) => {
      _.forEach(snippetConfiguration.templateFiles, (templateMetadata) => {
        const snippet = createSnippet(`${repoPath}/${templateMetadata.template}`, answers);

        if (templateMetadata.filename) {
          const filename = renderTemplateString(templateMetadata.filename, answers);

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

module.exports = {
  createFilesForSnippet,
  varsToObject,
};
