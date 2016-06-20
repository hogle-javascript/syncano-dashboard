export default function createTestInstances(tempAccount, instanceAmount) {
  const instances = [];
  const instancesNames = [];
  let i;

  for (i = 0; i < instanceAmount; i++) {
    const name = 'in' + Date.now() + i;
    instancesNames.push(name);
    instances.push(tempAccount.connection.Instance({
      name
    }));
  }

  return tempAccount.connection.Instance
    .please()
    .bulkCreate(instances)
    .then(() => {
      tempAccount.instanceName = instancesNames[0];
      tempAccount.connection.setInstanceName(tempAccount.instanceName);
      tempAccount.tempInstanceNames = instancesNames.filter((name) => name !== instancesNames[0]);
      return tempAccount;
    })
    .catch((error) => console.log(error));
}
