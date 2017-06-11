function humanReadableGeneratedCode(generatedCode) {
  const humanReadable = generatedCode.reduce((returnString, contents) => {
    const description = `File to create: ${contents.filepath}\n${contents.contents}`;
    return returnString + description + '\n-----------------------------------------------\n';
  }, '');
  return humanReadable;
}

module.exports = { humanReadableGeneratedCode };
