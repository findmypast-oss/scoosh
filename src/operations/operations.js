const _ = require('lodash');
const create = require('./create');
const insert = require('./insert');
const { renderTemplateString } = require('../create_snippet');

const operationToFunction = {
  create: create,
  insert: insert,
};

function processOperations(operations, answers, loggingFunction) {
  return _.map(operations, operation => {
    return operationToFunction[operation.operation](operation, answers, loggingFunction);
  });
}

function templateObjectKeys(objectWithTemplates, listOfKeys, variables) {
  let objectToReturn = _.deepClone(objectWithTemplates);
  listOfKeys.forEach(key => {
    objectToReturn[key] = renderTemplateString(objectToReturn[key], variables);
  });
  return objectToReturn;
}
module.exports = {
  processOperations,
  templateObjectKeys,
};
