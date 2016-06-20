export default function createTestScriptEndpoints(tempAccount, endpointsAmount) {
  const scriptEndpoints = [];
  const scriptEndpointsNames = [];
  let i;

  for (i = 0; i < endpointsAmount; i++) {
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
    .then(() => {
      tempAccount.tempScriptEndpointsNames = scriptEndpointsNames;
      return tempAccount;
    })
    .catch((error) => console.log(error));
}
