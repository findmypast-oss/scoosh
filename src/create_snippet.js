const _ = require('lodash');
const fs = require('fs');
const ejs = require('ejs');

function createSnippet(snippetPath, snippetVariables) {
  const content = fs.readFileSync(snippetPath).toString().trim();

  return renderTemplateString(content, snippetVariables);
}

function renderTemplateString(content, variables)
{
  variables._ = _; // inject lodash.js
  return ejs.render(content, variables);
}

module.exports = {createSnippet, renderTemplateString};
