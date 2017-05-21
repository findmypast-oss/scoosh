const fs = require('fs');
const path = require('path');
const walk = require('fs-walk');

function getListOfFilesWithMarker(startingPath, marker) {
    if (!fs.existsSync(startingPath)) {
        console.log('Path cannot be found: ' + startingPath);
        return undefined;
    }
    if (!startingPath) {
        return undefined;
    }
    let resultList = [];
    walk.walkSync(startingPath, function(basedir, filename, stat) {
        const filePath = path.join(basedir, filename);
        if (!stat.isDirectory() && doesMarkerExistInFile(filePath, marker)) {
            resultList.push(filePath);
        }
    });
    return resultList;
}

function doesMarkerExistInFile(filePath, marker) {
    if (!fs.existsSync(filePath)) {
        return false;
    } else {
        const fileToInsertInto = fs.readFileSync(filePath).toString();
        return fileToInsertInto.includes(marker);
    }
}

function insertStringIntoFile(filePath, marker, stringToInsert) {
    if (!fs.existsSync(filePath)) {
        return false;
    } else {
        const fileToInsertInto = fs.readFileSync(filePath).toString();
        const updatedString = insertStringIntoStringAtMarker(
            fileToInsertInto,
            marker,
            stringToInsert
        );
        fs.writeFileSync(filePath, updatedString, 'utf8');
    }
    return true;
}

function insertStringIntoStringAtMarker(fileString, markerString, insertString) {
    const markerIndex = fileString.indexOf(markerString);
    const nextLineIndex = fileString.indexOf('\n', markerIndex) + 1;

    const newString =
        fileString.slice(0, nextLineIndex) + insertString + fileString.slice(nextLineIndex);
    return newString;
}

module.exports = { insertStringIntoFile, insertStringIntoStringAtMarker, getListOfFilesWithMarker };
