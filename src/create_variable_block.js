const _ = require('lodash');
const fs = require('fs');
var inquirer = require('inquirer');

function readSnippetConfiguration(snippetConfigurationPath) {
  const metadataString = fs.readFileSync(snippetConfigurationPath).toString();
  const metadata = JSON.parse(metadataString);
  return metadata;
}

function filterParametersPassedFromCommandLine(commandLineParameters, questions) {
  return questions.filter(question => commandLineParameters[question.name] === undefined);
}
function createVariableBlock(commandLineParameters, metadata, done) {
  const questions = metadata.questions;

  const filteredQuestions = filterParametersPassedFromCommandLine(commandLineParameters, questions);

  inquirer.prompt(questions).then(function(answers) {
    var combinedAnswers = new Map([answers, commandLineParameters]);
    done(combinedAnswers, metadata.templateFile);
  });
}

module.exports = {
  createVariableBlock,
  readSnippetConfiguration,
  filterParametersPassedFromCommandLine,
};
