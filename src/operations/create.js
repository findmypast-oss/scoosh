// {
//   "operation": "create",
//   "templateFile": "graphql-content-resolver.ex",
//   "createFile": "<%- _.snakeCase(Name) %>.ex"
// }
const { createSnippet } = require('../create_snippet');
const fs = require('fs');
const { templateObjectKeys } = require('./operations');

export function create(operation, variables, loggingFunction = undefined) {
  const templatedOperation = templateObjectKeys(operation, ['templateFile', 'createFile']);

  const snippetContents = createSnippet(
    templatedOperation.templateFile,
    variables,
    loggingFunction
  );

  if (snippetContents) {
    if (!fs.existsSync(templatedOperation.createFile)) {
      fs.writeFileSync(templatedOperation.createFile, snippetContents);
    } else {
      loggingFunction &&
        loggingFunction(
          'Error trying to create file ${templatedOperation.createFile}, already exists.'
        );
    }
  }
}
