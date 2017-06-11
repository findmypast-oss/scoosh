#!/usr/bin/env node

const _ = require('lodash');
const clipboardy = require('clipboardy');

const fs = require('fs');

const { interactiveChooseSnippet } = require('./interactive');
const { createVariableBlock, readSnippetConfiguration } = require('./create_variable_block');
const { createSnippet, renderTemplateString } = require('./create_snippet');
const { getSnippetPath, getSnippetNamesFromAllSnippetFolders } = require('./get_snippet_path');
const { addFolderToConfig, getSnippetsReposFromConfig } = require('./config');

const configNotPopulatedMessage = `
In order to use turingsnip you'll need to register some tasty snippet folders
Edit the configuration file in ~/.turingsnip and add the paths
For Example :
{
  "snippetFolders": ["~/snippetFolder", "~/anotherSnippetFolder"]
}
`;
const couldNotFindSnippetMessage = 'Could not find the snippet in your snippet folders.\n';
const snipAvailableMessage = 'Clipboard contains complete snippet.\n';

function executeClipboardSnippet(name, config) {
  if (!name) {
    interactiveChooseSnippet(getAllSnippets(config), snippetName => {
      pushSnippetToFunction({}, config, snippetName, clipboardy.writeSync);
    });
  } else {
    pushSnippetToFunction({}, config, name, clipboardy.writeSync);
  }
}
function executeDebugSnippet(name, config) {
  pushSnippetToFunction({}, config, name, process.stdout.write);
}
function executeCreateSnippet(name, config, commandLineParameters) {
  if (!name) {
    interactiveChooseSnippet(getAllSnippets(config), snippetName => {
      createFilesForSnippet(snippetName, commandLineParameters, config);
    });
  } else {
    createFilesForSnippet(name, commandLineParameters, config);
  }
}

function executeAddFolderToConfig(path) {
  addFolderToConfig(path);
}

function executeListSnippets(config) {
  const allSnippets = getAllSnippets(config);

  process.stdout.write(JSON.stringify(allSnippets, undefined, 2) + '\n');
}

function createFilesForSnippet(snippetName, commandLineParameters, config) {
  pushSnippetToFunction(
    commandLineParameters,
    config,
    snippetName,
    (snippet, filename = undefined) => {
      if (filename !== undefined) {
        fs.writeFileSync(filename, `${snippet}\n`);
        process.stdout.write('Created snippet file\n');
      }
    }
  );
}

function getAllSnippets(config) {
  const snippetsRepos = getSnippetsReposFromConfig(config);
  if (!snippetsRepos) {
    process.stdout.write(configNotPopulatedMessage);
  }
  const allSnippets = [];
  _.find(snippetsRepos, repo => {
    allSnippets.push(...getSnippetNamesFromAllSnippetFolders(repo));
  });
  return allSnippets;
}

function searchForSnippetInRepos(snippetsRepos, snippetName) {
  let repoPath = _.find(snippetsRepos, repo => getSnippetPath(repo, snippetName));

  repoPath = getSnippetPath(repoPath, snippetName);
  return repoPath;
}

function pushSnippetToFunction(commandLineParameters, config, snippetName, apply) {
  const snippetsRepo = getSnippetsReposFromConfig(config);
  if (!snippetsRepo) {
    process.stdout.write(configNotPopulatedMessage);
  }
  const snippetPath = searchForSnippetInRepos(snippetsRepo, snippetName);

  if (snippetPath) {
    const snippetConfiguration = readSnippetConfiguration(`${snippetPath}/${snippetName}.json`);
    createVariableBlock(commandLineParameters, snippetConfiguration, answers => {
      _.forEach(snippetConfiguration.templateFiles, templateFile => {
        const snippet = createSnippet(`${snippetPath}/${templateFile}`, answers);

        if (templateFile !== undefined) {
          const filename = renderTemplateString(templateFile, answers);
          apply(snippet, filename);
        } else {
          apply(snippet);
        }
      });
    });
  } else {
    process.stdout.write(couldNotFindSnippetMessage);
  }
}

module.exports = {
  executeClipboardSnippet,
  executeDebugSnippet,
  executeCreateSnippet,
  executeListSnippets,
  executeAddFolderToConfig,
};
