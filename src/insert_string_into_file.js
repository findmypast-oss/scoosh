const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const walk = require('fs-walk');

function getListOfFilesWithMarker(startingPath, marker) {
  let returnDir = undefined;
  if (!fs.existsSync(startingPath)) {
      console.log('Path cannot be found: ' +
                  startingPath);
      return undefined;
  }
  if (!startingPath) {
    return undefined;
  }
  let resultList = [];
  walk.walkSync(startingPath, function(basedir, filename, stat, next) {
    const filePath = path.join(basedir, filename)
    console.log(filePath);
    if (!stat.isDirectory() &&
      doesMarkerExistInFile(filePath, marker))
    {
      resultList.push(filePath);
    }
  });
  return resultList;
}

function doesMarkerExistInFile(filePath, marker) {
  if (!fs.existsSync(filePath))
  {
    return false;
  } else
  {
    fileToInsertInto = fs.readFileSync(filePath).toString();
    return fileToInsertInto.includes(marker);
  }
  return true;
}

function insertStringIntoFile(filePath, marker, stringToInsert) {
  if (!fs.existsSync(filePath))
  {
    return false;
  } else
  {
    fileToInsertInto = fs.readFileSync(filePath).toString();
    const updatedString = insertStringIntoStringAtMarker(fileToInsertInto, marker, stringToInsert)
    fs.writeFileSync(filePath, updatedString, 'utf8')
  }
  return true;
}

function insertStringIntoStringAtMarker(fileString, markerString, insertString) {
  const markerIndex = fileString.indexOf(markerString);
  const nextLineIndex = fileString.indexOf("\n",markerIndex) + 1;

  newString = fileString.slice(0,nextLineIndex) + insertString + fileString.slice(nextLineIndex);
  return newString;
}

module.exports = {insertStringIntoFile,insertStringIntoStringAtMarker,getListOfFilesWithMarker};
