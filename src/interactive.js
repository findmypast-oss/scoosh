function interactiveChooseSnippet(allSnippets, inquirer) {
  const questions = {
    name: 'chosenSnippet',
    type: 'list',
    choices: allSnippets,
    message: 'Please select the snippet that you want.'
  };
  return inquirer.prompt(questions);
}
module.exports = {
  interactiveChooseSnippet
};
