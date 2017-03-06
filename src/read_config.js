const _ = require('lodash');
const fs = require('fs');

const configFilePath = `${process.env['HOME']}/.turingsnip`;

function readConfig() {
  var metadataString;
  if (!fs.existsSync(configFilePath))
  {
    metadataString = writeConfig({snippetFolders: []});
  } else
  {
    metadataString = fs.readFileSync(configFilePath).toString();
  }
  const metadata = JSON.parse(metadataString);

  return metadata;
}

function writeConfig(config) {
  const metadataString = JSON.stringify(config, undefined, 2);
  fs.writeFileSync(configFilePath, metadataString+"\n");
  return metadataString;
}


module.exports = {readConfig,writeConfig};
