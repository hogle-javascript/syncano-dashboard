'use strict';

function createTestInstances(tempAccount, instanceAmount) {
  let instances = [];
  let instancesNames = [];

  for (var i = 0; i < instanceAmount; i++) {
    const name = 'in' + Date.now() + i;
    instancesNames.push(name);
    instances.push(tempAccount.connection.Instance({
      name: name
    }));
  }

  return tempAccount.connection.Instance
    .please()
    .bulkCreate(instances)
    .then((response) => {
      tempAccount.instanceName = instancesNames[0];
      tempAccount.connection.setInstanceName(tempAccount.instanceName);
      tempAccount.tempInstanceNames = instancesNames.filter((name) => name !== instancesNames[0]);
      return tempAccount;
    })
    .catch((error) => console.log(error));
}

module.exports = createTestInstances;
