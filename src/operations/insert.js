// {
//   "operation": "insert",
//   "marker": "~~~ MARKER HERE~~~",
//   "templateFile": "graphql-content-resolver.ex",
//   "insertIntoFile": "<%- GitProjectRoot %>/"
// }
const { renderSnippetToString } = require('../create_snippet');
const { doesMarkerExistInFile, insertStringIntoStringAtMarker } = require('../insert_string_into_file');
const { templateObjectKeys } = require('./template-object-keys');
const path = require('path');
const fs = require('fs');

function insert(operation, variables, templateFolder, projectFolder, loggingFunction = undefined) {
  const templatedOperation = templateObjectKeys(operation, ['templateFile', 'insertIntoFile', 'marker'], variables);
  var contents;
  const fullPathToProject = path.normalize(projectFolder + '/' + templatedOperation.insertIntoFile);
  const snippetContents = renderSnippetToString(
    templateFolder + '/' + templatedOperation.templateFile,
    variables,
    loggingFunction
  );
  if (snippetContents) {
    if (doesMarkerExistInFile(fullPathToProject, templatedOperation.marker)) {
      const fileToInsertInto = fs.readFileSync(fullPathToProject);
      contents = insertStringIntoStringAtMarker(fileToInsertInto, templatedOperation.marker, snippetContents);
    } else {
      loggingFunction &&
        loggingFunction(
          'Marker ${templatedOperation.marker} does not exist ' + 'in file ${templatedOperation.insertIntoFile}'
        );
    }
  }
  return {
    filepath: fullPathToProject,
    contents: contents,
  };
}

module.exports = {
  insert,
};
