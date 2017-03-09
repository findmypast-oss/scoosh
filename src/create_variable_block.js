const _ = require('lodash');
const fs = require('fs');
var inquirer = require('inquirer');

function readSnippetConfiguration(snippetConfigurationPath) {
  const metadataString = fs.readFileSync(snippetConfigurationPath).toString();
  const metadata = JSON.parse(metadataString);
  return metadata;
}


function createVariableBlock(metadata, done) {
  const questions = metadata.questions;

  inquirer.prompt(questions).then(function (answers) {
    done(answers, metadata.templateFile);
  });
}

module.exports = {createVariableBlock,readSnippetConfiguration};
