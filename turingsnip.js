#!/usr/bin/env node

const _ = require('lodash');
const program = require('commander');

const { readConfig } = require('./src/config');
const {
    executeClipboardSnippet,
    executeDebugSnippet,
    executeCreateSnippet,
    executeListSnippets,
    executeAddFolderToConfig,
} = require('./src/snippets');

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
const missingSnippetNameMessage = 'Snippet name is missing';
const config = readConfig();

function varsToObject(variables, reportErrors) {
    const resultMap = {};
    _.forEach(variables, variable => {
        const splitVar = variable.split('=');
        if (splitVar.length <= 1) {
            reportErrors && reportErrors(`${variable}, variables should be in the form key=value`);
        }
        if (splitVar.length > 2) {
            reportErrors &&
                reportErrors(`${variable}, variables definitions cannot include = signs.`);
        }
        resultMap[splitVar[0]] = splitVar[1];
    });
    return resultMap;
}

program.version('1.0.0');

program
    .command('clip [snippetName]')
    .description('Put the requested snippet on the clipboard')
    .action((snippetName = undefined) => {
        executeClipboardSnippet(snippetName, config);
    });

program
    .command('debug <snippetName>')
    .description('Put the requested snippet on the console')
    .action((snippetName = undefined) => {
        snippetName !== undefined
            ? executeDebugSnippet(snippetName, config)
            : console.log(missingSnippetNameMessage);
    });

program
    .command('create [snippetName]')
    .description('Create files for snippet.')
    .option('-v, --vars <vars...>', 'key value variables')
    .action((snippetName = undefined) => {
        const commandLineParameters = varsToObject(program.vars);
        executeCreateSnippet(snippetName, config, commandLineParameters);
    });

program
    .command('list')
    .description('Creates a list of available snippets')
    .action(() => executeListSnippets(config));

program
    .command('addfolder <folderPath>')
    .description('Adds the path to the list of available snippet folders')
    .action(folderPath => executeAddFolderToConfig(folderPath));

program.parse(process.argv);

if (!process.argv.slice(2).length) {
    program.outputHelp();
}

module.exports = {
    varsToObject,
};
