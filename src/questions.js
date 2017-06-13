function filterExistingParameters(templateParameters, questions) {
  return questions.filter(
    question => templateParameters[question.name] === undefined
  );
}

async function inquireForMissingParams(templateParameters, metadata, inquirer) {
  const questions = metadata.questions;
  const filteredQuestions = filterExistingParameters(
    templateParameters,
    questions
  );
  let answers = {};
  if (filteredQuestions.length > 0) {
    answers = await inquirer.prompt(filteredQuestions);
  }
  return Object.assign(answers, templateParameters);
}

module.exports = {
  inquireForMissingParams,
  filterExistingParameters
};
