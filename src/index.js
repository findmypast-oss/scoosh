const { executeDebugSnippet, executeCreateSnippet, executeListSnippets } = require('./src/snippets');

module.exports = {
  preview: executeDebugSnippet,
  create: executeCreateSnippet,
  list: executeListSnippets,
};
