// {
//   "operation": "makefolder",
//   "path": "<%- GitProjectRoot %>/api/lib"
// }
const { renderTemplateString } = require('../create_snippet');
const { templateObjectKeys } = require('./operations');

const fs = require('fs');

function createFolder(operation, variables, loggingFunction = undefined) {
  const templatedOperation = templateObjectKeys(operation, ['templateFile']);
  templatedOperation.path = renderTemplateString(templatedOperation.path, variables);
  if (!fs.existsSync(templatedOperation.path)) {
    fs.mkdirSync(templatedOperation.path);
  } else {
    loggingFunction && loggingFunction('Folder ${templatedOperation.path} already exists');
  }
}
module.exports = {
  createFolder,
};
