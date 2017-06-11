// {
//   "operation": "insert",
//   "marker": "~~~ MARKER HERE~~~",
//   "templateFile": "graphql-content-resolver.ex",
//   "insertIntoFile": "<%- GitProjectRoot %>/"
// }
const { renderSnippetToString } = require('../create_snippet');
const { doesMarkerExistInFile, insertStringIntoStringAtMarker } = require('../insert_string_into_file');
const { templateObjectKeys } = require('./operations');

function insert(operation, variables, loggingFunction = undefined) {
  const templatedOperation = templateObjectKeys(operation, ['templateFile', 'insertIntoFile', 'marker']);
  var contents;

  const snippetContents = renderSnippetToString(templatedOperation.templateFile, variables, loggingFunction);
  if (snippetContents) {
    if (doesMarkerExistInFile(templatedOperation.insertIntoFile, templatedOperation.marker)) {
      contents = insertStringIntoStringAtMarker(
        templatedOperation.insertIntoFile,
        templatedOperation.marker,
        snippetContents
      );
    } else {
      loggingFunction &&
        loggingFunction(
          'Marker ${templatedOperation.marker} does not exist ' + 'in file ${templatedOperation.insertIntoFile}'
        );
    }
  }
  return {
    filepath: templatedOperation.insertIntoFile,
    contents: contents,
  };
}

module.exports = {
  insert,
};
