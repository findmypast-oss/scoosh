const _ = require('lodash');
const create = require('./create');
const createFolder = require('./create_folder');
const clipboard = require('./clipboard');
const insert = require('./insert');
const { renderTemplateString } = require('../create_snippet');

const operationToFunction = {
  create: create,
  createFolder: createFolder,
  clipboard: clipboard,
  insert: insert,
};

export function processOperations(operations, answers, loggingFunction) {
  _.forEach(operations, operation => {
    operationToFunction[operation.operation](operation, answers, loggingFunction);
  });
}

export function templateObjectKeys(objectWithTemplates, listOfKeys, variables) {
  let objectToReturn = _.deepClone(objectWithTemplates);
  listOfKeys.forEach(key => {
    objectToReturn[key] = renderTemplateString(objectToReturn[key], variables);
  });
  return objectToReturn;
}
