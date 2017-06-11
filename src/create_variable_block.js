const fs = require('fs');
var inquirer = require('inquirer');

function readGeneratedCodeConfiguration(snippetConfigurationPath) {
  const metadataString = fs.readFileSync(snippetConfigurationPath).toString();
  const metadata = JSON.parse(metadataString);
  return metadata;
}

function filterParametersPassedFromCommandLine(commandLineParameters, questions) {
  return questions.filter(question => commandLineParameters[question.name] === undefined);
}

function inquireForMissingAnswers(commandLineParameters, metadata, done) {
  const questions = metadata.questions;
  const filteredQuestions = filterParametersPassedFromCommandLine(commandLineParameters, questions);
  if (filteredQuestions.length > 0) {
    inquirer.prompt(filteredQuestions).then(function(answers) {
      var combinedAnswers = Object.assign(answers, commandLineParameters);
      done(combinedAnswers, metadata.operations);
    });
  } else {
    done(commandLineParameters, metadata.operations);
  }
}

module.exports = {
  inquireForMissingAnswers,
  readGeneratedCodeConfiguration,
  filterParametersPassedFromCommandLine,
};
