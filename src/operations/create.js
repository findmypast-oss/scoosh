// {
//   "operation": "create",
//   "templateFile": "graphql-content-resolver.ex",
//   "createFile": "<%- _.snakeCase(Name) %>.ex"
// }
const { renderSnippetToString } = require('../create_snippet');
const { templateObjectKeys } = require('./template-object-keys');

function create(operation, variables, folder, loggingFunction = undefined) {
  console.log(operation);
  console.log(variables);

  const templatedOperation = templateObjectKeys(operation, ['templateFile', 'createFile'], variables);
  console.log(templatedOperation.templateFile);
  const snippetContents = renderSnippetToString(
    folder + '/' + templatedOperation.templateFile,
    variables,
    loggingFunction
  );

  if (!snippetContents) {
    loggingFunction && loggingFunction('Error trying to create file ${templatedOperation.createFile}, already exists.');
  }

  return {
    filepath: templatedOperation.path,
    contents: snippetContents,
  };
}
module.exports = {
  create,
};
