#!/usr/bin/env node

const _ = require('lodash');
const program = require('commander');

const { readConfig } = require('./src/config');
const { executeDebugSnippet, executeCreateSnippet, executeListSnippets } = require('./src/snippets');

const missingSnippetNameMessage = 'Snippet name is missing\n';
const config = readConfig();

program.version('1.0.0');

program
  .command('debug <snippetName>')
  .description('Put the requested snippet on the console')
  .action((snippetName = undefined) => {
    snippetName !== undefined
      ? executeDebugSnippet(snippetName, config)
      : process.stdout.write(missingSnippetNameMessage);
  });

program
  .command('execute [snippetName]')
  .description('Create files for snippet.')
  .option('-v, --vars <vars...>', 'key value variables')
  .action((snippetName = undefined) => {
    const commandLineParameters = varsToObject(program.vars);
    executeCreateSnippet(snippetName, config, commandLineParameters);
  });

program.command('list').description('Creates a list of available snippets').action(() => executeListSnippets(config));

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}

function varsToObject(variables, reportErrors) {
  const resultMap = {};
  _.forEach(variables, variable => {
    const splitVar = variable.split('=');
    if (splitVar.length <= 1) {
      reportErrors && reportErrors(`${variable}, variables should be in the form key=value`);
    }
    if (splitVar.length > 2) {
      reportErrors && reportErrors(`${variable}, variables definitions cannot include = signs.`);
    }
    resultMap[splitVar[0]] = splitVar[1];
  });
  return resultMap;
}

module.exports = {
  varsToObject,
};
