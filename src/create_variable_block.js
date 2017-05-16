const _ = require('lodash');
const fs = require('fs');
var inquirer = require('inquirer');

function readSnippetConfiguration(snippetConfigurationPath) {
  const metadataString = fs.readFileSync(snippetConfigurationPath).toString();
  const metadata = JSON.parse(metadataString);
  return metadata;
}


function createVariableBlock(commandLineParameters, metadata, done) {
  const questions = metadata.questions;

  const filteredQuestions = questions.filter((question) => commandLineParameters[question.name] === undefined)

  inquirer.prompt(questions).then(function (answers) {
    var combinedAnswers = new Map([answers, commandLineParameters]);
    done(combinedAnswers, metadata.templateFile);
  });
}

module.exports = {createVariableBlock,readSnippetConfiguration};
