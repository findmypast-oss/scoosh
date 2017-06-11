#!/usr/bin/env node
const _ = require('lodash');
const { interactiveChooseSnippet } = require('./interactive');
const { inquireForMissingAnswers, readGeneratedCodeConfiguration } = require('./create_variable_block');
const { getSnippetPath, getSnippetNamesFromAllSnippetFolders } = require('./get_snippet_path');
const { getSnippetsReposFromConfig } = require('./config');
const { processOperations } = require('./operations/operations');
const { humanReadableGeneratedCode } = require('./generated-code/generated-code-display');
const { commitGeneratedCode } = require('./generated-code/generated-code-commit');

const configNotPopulatedMessage = `
In order to use turingsnip you'll need to register some tasty snippet folders
Edit the configuration file in ~/.turingsnip and add the paths
For Example :
{
  "snippetFolders": ["~/snippetFolder", "~/anotherSnippetFolder"]
}
`;
//const couldNotFindSnippetMessage = 'Could not find the snippet in your snippet folders.\n';
//const snipAvailableMessage = 'Clipboard contains complete snippet.\n';

function executeListSnippets(config) {
  const allSnippets = getAllSnippets(config);

  process.stdout.write(JSON.stringify(allSnippets, undefined, 2) + '\n');
}

function executeCodeGeneration(name, config, commandLineParameters, loggingFunction, outputFunction, workingFolder) {
  if (!name) {
    const allSnippets = getAllSnippets(config);
    name = interactiveChooseSnippet(allSnippets, function(name) {
      executeCodeGenerationWithName(name, commandLineParameters, loggingFunction, workingFolder, outputFunction);
    });
  } else {
    executeCodeGenerationWithName(name, commandLineParameters, loggingFunction, workingFolder, outputFunction);
  }
}
function executeCodeGenerationWithName(name, commandLineParameters, loggingFunction, workingFolder, apply) {
  const pathToSnippet = getSnippetPath(workingFolder, name);
  console.log(pathToSnippet);
  const generatedCodeMetadata = readGeneratedCodeConfiguration(pathToSnippet);

  inquireForMissingAnswers(commandLineParameters, generatedCodeMetadata, function(answers, operations) {
    const storedOperations = processOperations(operations, answers, loggingFunction);
    process.stdout.write(apply(storedOperations));
  });
}

function executeDebugSnippet(name, config, commandLineParameters, loggingFunction, workingFolder = process.cwd()) {
  executeCodeGeneration(
    name,
    config,
    commandLineParameters,
    loggingFunction,
    humanReadableGeneratedCode,
    workingFolder
  );
}

function executeCreateSnippet(name, config, commandLineParameters, loggingFunction, workingFolder = process.cwd()) {
  executeCodeGeneration(name, config, commandLineParameters, loggingFunction, commitGeneratedCode, workingFolder);
}

function getAllSnippets(config) {
  const snippetsRepos = getSnippetsReposFromConfig(config);
  if (!snippetsRepos) {
    process.stdout.write(configNotPopulatedMessage);
  }
  const allSnippets = [];
  _.find(snippetsRepos, repo => {
    const snippetNames = getSnippetNamesFromAllSnippetFolders(repo);
    allSnippets.push(...snippetNames);
  });
  return allSnippets;
}

module.exports = {
  executeDebugSnippet,
  executeCreateSnippet,
  executeListSnippets,
};
