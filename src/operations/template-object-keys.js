const _ = require('lodash');
const { renderTemplateString } = require('../create_snippet');

function templateObjectKeys(objectWithTemplates, listOfKeys, variables) {
  let objectToReturn = _.cloneDeep(objectWithTemplates);
  listOfKeys.forEach(key => {
    objectToReturn[key] = renderTemplateString(objectToReturn[key], variables);
  });
  return objectToReturn;
}

module.exports = {
  templateObjectKeys,
};
