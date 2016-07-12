import createTestAccount from '../create/testAccount.js';
import createTestInstances from '../create/testInstance.js';
import createTestScripts from '../create/testScripts.js';
import createTestScriptEndpoints from '../create/testScriptEndpoint.js';
import createTestUsers from '../create/testUser';
import createTestApiKey from '../create/testApiKey';

const createNavigationUser = () => {
  return createTestAccount()
    .then((tempAccount) => createTestInstances(tempAccount, 1))
    .then((tempAccount) => createTestScripts(tempAccount, 1))
    .then((tempAccount) => createTestScriptEndpoints(tempAccount, 1))
    .then((tempAccount) => createTestUsers(tempAccount, 1))
    .then((tempAccount) => createTestApiKey(tempAccount, 1))
    .then((tempAccount) => {
      delete tempAccount.connection;
      return tempAccount;
    });
};

export default createNavigationUser;
