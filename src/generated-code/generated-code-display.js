function humanReadableGeneratedCode(generatedCode) {
  const barString = '\n-----------------------------------------------\n';
  const humanReadable = generatedCode.reduce((returnString, contents) => {
    const description = `File to create: ${contents.filepath}${barString}${contents.contents}`;
    return returnString + description + barString;
  }, '');
  return humanReadable;
}

module.exports = { humanReadableGeneratedCode };
