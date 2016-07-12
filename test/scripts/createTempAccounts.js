import createTestAccount from './create/testAccount.js';
import createTestInstances from './create/testInstance.js';
import createTestClasses from './create/testClasses.js';
import createTestScripts from './create/testScripts.js';
import createTestScriptEndpoints from './create/testScriptEndpoint.js';
import createAPNSSocket from './create/apnsSocket.js';
import createGCMSocket from './create/gcmSocket.js';
import createAPNSDevices from './create/apnsDevices.js';
import createGCMDevices from './create/gcmDevices.js';
import createTestUsers from './create/testUser';
import createTestApiKey from './create/testApiKey';
import getCertFile from './files/getCertificate.js';
import saveAccountsToFile from './files/saveAccounts.js';

const accounts = {};

function createInstanceUser() {
  return createTestAccount()
    .then((tempAccount) => createTestInstances(tempAccount, 3))
    .then((tempAccount) => createTestClasses(tempAccount, 3))
    .then((tempAccount) => createTestScripts(tempAccount, 3))
    .then((tempAccount) => createAPNSSocket(tempAccount))
    .then((tempAccount) => createGCMSocket(tempAccount))
    .then((tempAccount) => createAPNSDevices(tempAccount, 2))
    .then((tempAccount) => createGCMDevices(tempAccount, 2))
    .then((tempAccount) => {
      delete tempAccount.connection;
      accounts.instanceUser = tempAccount;
    });
}

function createAltInstanceUser() {
  return createTestAccount()
    .then((tempAccount) => createTestInstances(tempAccount, 1))
    .then((tempAccount) => createTestClasses(tempAccount, 1))
    .then((tempAccount) => createTestScripts(tempAccount, 1))
    .then((tempAccount) => {
      delete tempAccount.connection;
      accounts.alternativeUser = tempAccount;
    });
}

function createNavigationUser() {
  return createTestAccount()
    .then((tempAccount) => createTestInstances(tempAccount, 1))
    .then((tempAccount) => createTestScripts(tempAccount, 1))
    .then((tempAccount) => createTestScriptEndpoints(tempAccount, 1))
    .then((tempAccount) => createTestUsers(tempAccount, 1))
    .then((tempAccount) => createTestApiKey(tempAccount, 1))
    .then((tempAccount) => {
      delete tempAccount.connection;
      accounts.navigationUser = tempAccount;
    });
}

if (!process.env.NIGHTWATCH_EMAIL || !process.env.NIGHTWATCH_PASSWORD || !process.env.NIGHTWATCH_ACCOUNT_KEY) {
  throw new Error(`Missing exported env variables!!
  Please check if you have exported:
  ο NIGHTWATCH_EMAIL
  ο NIGHTWATCH_PASSWORD
  ο NIGHTWATCH_ACCOUNT_KEY
  `);
} else {
  getCertFile();
  createInstanceUser()
    .then(createAltInstanceUser)
    .then(createNavigationUser)
    .then(() => {
      console.log('Account details for debugging:\n', accounts);
      saveAccountsToFile(accounts);
    })
    .catch((error) => console.log(error));
}
