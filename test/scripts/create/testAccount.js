'use strict';

function createTestAccount() {
  const Syncano = require('syncano');
  const baseUrl = 'https://api.syncano.rocks';
  const connection = Syncano({baseUrl});
  let tempAccount;

  function setup() {
    tempAccount = {
      instanceName: 'in' + Date.now(),
      password: Date.now(),
      email: `syncano.bot+${Date.now()}@syncano.com`
    };

    return createAccount()
      .then(createInstance)
      .then(() => { 
        tempAccount.connection = connection;

        return tempAccount;
      });
  }

  function createAccount() {
    return connection
      .Account
      .register({
        email: tempAccount.email,
        password: tempAccount.password
      })
      .then((user) => {
        tempAccount.accountKey = user.account_key;

        connection.setAccountKey(user.account_key);
        return;
      })
      .catch((error) => console.error('createAccount', error));
  }

  function createInstance() {
    return connection
      .Instance
      .please()
      .create({name: tempAccount.instanceName})
      .then(() => {
        connection.setInstanceName(tempAccount.instanceName);
        return;
      })
      .catch((error) => console.error('createInstance', error));
  }

  return setup();
}


module.exports = createTestAccount;
