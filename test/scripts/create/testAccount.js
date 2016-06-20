import Syncano from 'syncano';

const createTestAccount = () => {
  const baseUrl = 'https://api.syncano.rocks';
  const connection = Syncano({ baseUrl });
  let tempAccount;

  const createAccount = () => {
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
  };

  const setup = () => {
    tempAccount = {
      password: Date.now(),
      email: `syncano.bot+${Date.now()}@syncano.com`
    };

    return createAccount()
      .then(() => {
        tempAccount.connection = connection;

        return tempAccount;
      });
  };

  return setup();
};

export default createTestAccount;
