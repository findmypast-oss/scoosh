const _ = require('lodash');
const { create } = require('./create');
const { insert } = require('./insert');

const operationToFunction = {
  create: create,
  insert: insert,
};

function processOperations(operations, answers, templateFolder, projectFolder, loggingFunction) {
  return _.map(operations, operation => {
    const functionToCall = operationToFunction[operation.operation];
    return functionToCall(operation, answers, templateFolder, projectFolder, loggingFunction);
  });
}
module.exports = {
  processOperations,
};
