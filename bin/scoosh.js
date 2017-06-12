#!/usr/bin/env node

const program = require('commander');
const { preview, create, list } = require('../src');
const { varsToObject } = require('./utils/map_vars_to_object');

//const missingSnippetNameMessage = 'Snippet name is missing\n';
program.version(require('../package.json').version);

program
  .command('preview [generatedCodeTemplate]')
  .description('Put the requested snippet on the console')
  .option('-v, --vars <vars...>', 'key value variables')
  .action((generatedCodeTemplate = undefined) => {
    const commandLineParameters = program.vars && varsToObject(program.vars);
    console.log(commandLineParameters);
    preview(generatedCodeTemplate, commandLineParameters, process.stdout.write);
  });

program
  .command('generate [generatedCodeTemplate]')
  .description('Create files for snippet.')
  .option('-v, --vars <vars...>', 'key value variables')
  .action((generatedCodeTemplate = undefined) => {
    const commandLineParameters = program.vars && varsToObject(program.vars);
    create(generatedCodeTemplate, commandLineParameters);
  });

program.command('list').description('Creates a list of available snippets').action(() => list());

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}

module.exports = {
  varsToObject,
};
