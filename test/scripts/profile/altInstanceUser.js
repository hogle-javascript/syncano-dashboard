import createTestAccount from '../create/testAccount.js';
import createTestInstances from '../create/testInstance.js';
import createTestClasses from '../create/testClasses.js';
import createTestScripts from '../create/testScripts.js';

const createAltInstanceUser = () => {
  return createTestAccount()
    .then((tempAccount) => createTestInstances(tempAccount, 1))
    .then((tempAccount) => createTestClasses(tempAccount, 1))
    .then((tempAccount) => createTestScripts(tempAccount, 1))
    .then((tempAccount) => {
      delete tempAccount.connection;
      return tempAccount;
    });
};

export default createAltInstanceUser;
