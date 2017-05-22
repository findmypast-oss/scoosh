// {
//   "operation": "insert",
//   "marker": "~~~ MARKER HERE~~~",
//   "templateFile": "graphql-content-resolver.ex",
//   "insertIntoFile": "<%- GitProjectRoot %>/"
// }
const { createSnippet } = require('../create_snippet');
const { doesMarkerExistInFile, insertStringIntoFile } = require('../insert_string_into_file');
const { templateObjectKeys } = require('./operations');

const fs = require('fs');

export function insert(operation, variables, loggingFunction = undefined) {
  const templatedOperation = templateObjectKeys(operation, [
    'templateFile',
    'insertIntoFile',
    'marker',
  ]);

  const snippetContents = createSnippet(
    templatedOperation.templateFile,
    variables,
    loggingFunction
  );
  if (snippetContents) {
    if (doesMarkerExistInFile(templatedOperation.insertIntoFile, templatedOperation.marker)) {
      insertStringIntoFile(
        templatedOperation.insertIntoFile,
        templatedOperation.marker,
        snippetContents
      );
    } else {
      loggingFunction &&
        loggingFunction(
          'Marker ${templatedOperation.marker} does not exist ' +
            'in file ${templatedOperation.insertIntoFile}'
        );
    }
  }

  if (snippetContents) {
    if (!fs.existsSync(templatedOperation.createFile)) {
      fs.writeFileSync(templatedOperation.createFile, snippetContents);
    } else {
      loggingFunction &&
        loggingFunction('Error trying to create file ${operation.createFile}, already exists.');
    }
  }
}
