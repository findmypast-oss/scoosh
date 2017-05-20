const lodash = require('lodash');
const fs = require('fs');
const ejs = require('ejs');
const getRelativePathToGitRoot = require('./find_project_root');

function createSnippet(snippetPath, snippetVariables) {
  const content = fs.readFileSync(snippetPath).toString().trim();

  return renderTemplateString(content, snippetVariables);
}

function renderTemplateString(content, variables) {
  variables._ = lodash; // inject lodash.js
  variables.fs = fs;
  variables.gitRoot = getRelativePathToGitRoot;

  return ejs.render(content, variables);
}

module.exports = { createSnippet, renderTemplateString };
