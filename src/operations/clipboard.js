// {
//   "operation": "clipboard",
//   "templateFile": "graphql-content-resolver.ex"
// }
const { createSnippet } = require('../create_snippet');
const clipboardy = require('clipboardy');
const { templateObjectKeys } = require('./operations');

function clipboard(operation, variables, loggingFunction = undefined) {
  const templatedOperation = templateObjectKeys(operation, ['templateFile']);

  const snippetContents = createSnippet(templatedOperation.templateFile, variables, loggingFunction);
  if (snippetContents) {
    clipboardy.writeSync(snippetContents);
  } else {
    loggingFunction && loggingFunction('Template file ${templatedOperation.templateFile} does not exist');
  }
}
module.exports = {
  clipboard,
};
