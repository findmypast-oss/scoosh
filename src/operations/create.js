// {
//   "operation": "create",
//   "templateFile": "graphql-content-resolver.ex",
//   "createFile": "<%- _.snakeCase(Name) %>.ex"
// }
const { renderSnippetToString } = require('../create_snippet');
const { templateObjectKeys } = require('./operations');

function create(operation, variables, loggingFunction = undefined) {
  const templatedOperation = templateObjectKeys(operation, ['templateFile', 'createFile']);

  const snippetContents = renderSnippetToString(templatedOperation.templateFile, variables, loggingFunction);

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
