'use strict';

const createTestAccount = require('./create/testAccount.js');
const createTestInstances = require('./create/testInstance.js');
const createTestClasses = require('./create/testClasses.js');
const createTestScripts = require('./create/testScripts.js');
const createTestScriptEndpoints = require('./create/testScriptEndpoint.js');
const createAPNSSocket = require('./create/apnsSocket.js');
const createGCMSocket = require('./create/gcmSocket.js');
const createAPNSDevices = require('./create/apnsDevices.js');
const createGCMDevices = require('./create/gcmDevices.js');
const createTestUsers = require('./create/testUser');
const createTestApiKey = require('./create/testApiKey');
const getCertFile = require('./files/getCertificate.js');
const saveAccountsToFile = require('./files/saveAccounts.js');

let accounts = {};

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
  throw `Missing exported env variables!!
  Please check if you have exported:
  ο NIGHTWATCH_EMAIL
  ο NIGHTWATCH_PASSWORD
  ο NIGHTWATCH_ACCOUNT_KEY
  `;
} else {
  getCertFile();
  createInstanceUser()
    .then(createAltInstanceUser)
    .then(createNavigationUser)
    .then(() => {
      console.log('Account details for debugging:\n', accounts);
      saveAccountsToFile(accounts);
    });
}
