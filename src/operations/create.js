// {
//   "operation": "create",
//   "templateFile": "graphql-content-resolver.ex",
//   "createFile": "<%- _.snakeCase(Name) %>.ex"
// }
const { renderSnippetToString } = require('../create_snippet');
const { templateObjectKeys } = require('./template-object-keys');
const path = require('path');

function create(operation, variables, templateFolder, projectFolder, loggingFunction = undefined) {
  const templatedOperation = templateObjectKeys(operation, ['templateFile', 'createFile'], variables);
  const snippetContents = renderSnippetToString(
    templateFolder + '/' + templatedOperation.templateFile,
    variables,
    loggingFunction
  );

  if (!snippetContents) {
    loggingFunction && loggingFunction('Error trying to create file ${templatedOperation.createFile}, already exists.');
  }

  return {
    filepath: path.normalize(projectFolder + '/' + templatedOperation.createFile),
    contents: snippetContents,
  };
}
module.exports = {
  create,
};
