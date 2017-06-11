const _ = require('lodash');
const { create } = require('./create');
const { insert } = require('./insert');

const operationToFunction = {
  create: create,
  insert: insert,
};

function processOperations(operations, answers, folder, loggingFunction) {
  return _.map(operations, operation => {
    const functionToCall = operationToFunction[operation.operation];
    return functionToCall(operation, answers, folder, loggingFunction);
  });
}
module.exports = {
  processOperations,
};
