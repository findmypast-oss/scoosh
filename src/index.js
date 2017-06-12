const { executeDebugSnippet, executeCreateSnippet, executeListSnippets } = require('./snippets');

module.exports = {
  preview: executeDebugSnippet,
  create: executeCreateSnippet,
  list: executeListSnippets,
};
