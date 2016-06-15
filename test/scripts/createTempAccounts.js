'use strict';

const createTestAccount = require('./create/testAccount.js');
const createTestInstances = require('./create/testInstance.js');
const createTestClasses = require('./create/testClasses.js');
const createTestScripts = require('./create/testScripts.js');
const createAPNSSocket = require('./create/apnsSocket.js');
const createGCMSocket = require('./create/gcmSocket.js');
const createAPNSDevices = require('./create/apnsDevices.js');
const createGCMDevices = require('./create/gcmDevices.js');
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
    .then((tempAccount) => {
      delete tempAccount.connection;
      accounts.navigationUser = tempAccount;
    });
}

getCertFile();
createInstanceUser()
  .then(createAltInstanceUser)
  .then(createNavigationUser)
  .then(() => {
    console.log('Account details for debugging:\n', accounts);
    saveAccountsToFile(accounts);
  });
