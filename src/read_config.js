const _ = require('lodash');
const fs = require('fs');

function readConfig() {
  const configFilePath = `${process.env['HOME']}/.turingsnip`;

  var metadataString;
  if (!fs.existsSync(configFilePath))
  {
    metadataString = JSON.stringify({snippetRepos: []}, undefined, 2);
    fs.writeFileSync(configFilePath, metadataString+"\n");
  } else
  {
    metadataString = fs.readFileSync(configFilePath).toString();
  }
  const metadata = JSON.parse(metadataString);

  return metadata;
}

module.exports = readConfig;
