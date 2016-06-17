'use strict';

function createTestScriptEndpoints(tempAccount, endpointsAmount) {
  let scriptEndpoints = [];
  let scriptEndpointsNames = [];

  for (var i = 0; i < endpointsAmount; i++) {
    const name = `scriptEndpoint_${Date.now() + i}`;
    const script = 1;

    scriptEndpointsNames.push(name);
    scriptEndpoints.push(tempAccount.connection.ScriptEndpoint({
      name,
      script
    }));
  }

  return tempAccount.connection.ScriptEndpoint
    .please()
    .bulkCreate(scriptEndpoints)
    .then((response) => {
      tempAccount.tempScriptEndpointsNames = scriptEndpointsNames;
      return tempAccount;
    })
    .catch((error) => console.log(error));
}

module.exports = createTestScriptEndpoints;
