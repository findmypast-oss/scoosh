#!/usr/bin/env node
const _ = require('lodash');
const { interactiveChooseSnippet } = require('./interactive');
const { inquireForMissingParams } = require('./questions');

const {
  getSnippetPath,
  getSnippetNamesFromAllSnippetFolders
} = require('./get_snippet_path');

const { readConfig, getSnippetsReposFromConfig } = require('./config');
const { processOperations } = require('./operations');
const { prettify, commit } = require('./generated-code-processing');

const configNotPopulatedMessage = `
In order to use turingsnip you'll need to register some tasty snippet folders
Edit the configuration file in ~/.scoosh and add the paths
For Example :
{
  "snippetFolders": ["~/snippetFolder", "~/anotherSnippetFolder"]
}
`;
//const couldNotFindSnippetMessage = 'Could not find the snippet in your snippet folders.\n';
//const snipAvailableMessage = 'Clipboard contains complete snippet.\n';

function executeListSnippets() {
  const config = readConfig();
  const allSnippets = getAllSnippets(config);

  console.log(JSON.stringify(allSnippets, undefined, 2) + '\n');
}

async function executeCreateSnippet(
  name,
  inputParameters = {},
  inquirer = require('inquirer'),
  loggingFunction = console.log,
  workingFolder = process.cwd()
) {
  const generatedCode = await executeCodeGeneration(
    name,
    inputParameters,
    inquirer,
    loggingFunction,
    workingFolder
  );
  loggingFunction(commit(generatedCode));
}

async function executeDebugSnippet(
  name,
  inputParameters = {},
  inquirer = require('inquirer'),
  loggingFunction = console.log,
  workingFolder = process.cwd()
) {
  const generatedCode = await executeCodeGeneration(
    name,
    inputParameters,
    inquirer,
    loggingFunction,
    workingFolder
  );
  loggingFunction(prettify(generatedCode));
}

async function executeCodeGeneration(
  name,
  inputParameters,
  inquirer,
  loggingFunction,
  workingFolder
) {
  const config = readConfig();
  if (!name) {
    const allSnippets = getAllSnippets(config);
    const { chosenSnippet } = await interactiveChooseSnippet(
      allSnippets,
      inquirer
    );
    name = chosenSnippet;
  }

  const pathToSnippet = getSnippetPath(workingFolder, name);
  console.log(pathToSnippet);
  console.log(name);
  const generatedCodeMetadata = require(pathToSnippet + '/' + name + '.json');

  const templateParameters = await inquireForMissingParams(
    inputParameters,
    generatedCodeMetadata,
    inquirer
  );
  const generatedCode = processOperations(
    generatedCodeMetadata.operations,
    templateParameters,
    pathToSnippet,
    workingFolder,
    loggingFunction
  );
  return generatedCode;
}

function getAllSnippets(config) {
  const snippetsRepos = getSnippetsReposFromConfig(config);
  if (!snippetsRepos) {
    console.log(configNotPopulatedMessage);
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
  executeListSnippets
};
