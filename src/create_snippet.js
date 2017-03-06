const _ = require('lodash');
const fs = require('fs');
const ejs = require('ejs');

function createSnippet(snippetPath, snippetVariables) {
  const content = fs.readFileSync(snippetPath).toString().trim();

  return ejs.render(content, snippetVariables);
}

module.exports = createSnippet;
