function varsToObject(variables, reportErrors) {
  const resultMap = variables
    .map(variable => {
      const splitVar = variable.split('=');
      if (splitVar.length <= 1) {
        reportErrors && reportErrors(`${variable}, variables should be in the form key=value`);
      }
      if (splitVar.length > 2) {
        reportErrors && reportErrors(`${variable}, variables definitions cannot include = signs.`);
      }
      return splitVar;
    })
    .reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});
  return resultMap;
}

module.exports = { varsToObject };
