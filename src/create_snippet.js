const lodash = require('lodash');
const fs = require('fs');
const ejs = require('ejs');

function createSnippet(snippetPath, snippetVariables, loggingFunction = undefined) {
  let content = undefined;
  if (fs.existsSync(snippetPath)) {
    content = fs.readFileSync(snippetPath).toString().trim();
  } else {
    loggingFunction && loggingFunction('Error : Template file ${snippetPath} does not exist.');
    return undefined;
  }
  return renderTemplateString(content, snippetVariables);
}

function renderTemplateString(content, variables) {
  variables._ = lodash; // inject lodash.js
  variables.fs = fs;

  return ejs.render(content, variables);
}

module.exports = { createSnippet, renderTemplateString };
