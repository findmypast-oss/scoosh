const inquirer = require('inquirer');

function interactiveChooseSnippet(allSnippets, apply) {
  const questions = {
    name: 'ChooseSnippet',
    type: 'list',
    choices: allSnippets,
    message: 'Please select the snippet that you want.',
  };
  inquirer.prompt(questions).then(answers => {
    apply(answers.ChooseSnippet);
  });
}
module.exports = {
  interactiveChooseSnippet,
};
