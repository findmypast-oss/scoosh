const _ = require('lodash');
const fs = require('fs');
var inquirer = require('inquirer');

function createVariableBlock(variableMetadataPath, done) {
  const metadataString = fs.readFileSync(variableMetadataPath).toString();
  const metadata = JSON.parse(metadataString);

  const questions = metadata.questions;

  inquirer.prompt(questions).then(function (answers) {
    done(answers, metadata.templateFile);
  });
}

module.exports = createVariableBlock;
