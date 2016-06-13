'use strict';

const createTestAccount = require('./create/testAccount.js');
const createTestClasses = require('./create/testClasses.js');
const createTestScripts = require('./create/testScripts.js');
const createAPNSSocket = require('./create/apnsSocket.js');
const createGCMSocket = require('./create/gcmSocket.js');
const getCertFile = require('./files/getCertificate.js');
const removeCert = require('./files/removeCertificate.js');
const saveAccountsToFile = require('./files/saveAccounts.js');

let accounts = {};

function createInstanceUser() {
  return createTestAccount()
    .then((tempAccount) => createTestClasses(tempAccount, 3))
    .then((tempAccount) => createTestScripts(tempAccount, 3))
    .then((tempAccount) => createAPNSSocket(tempAccount))
    .then((tempAccount) => createGCMSocket(tempAccount))
    .then((tempAccount) => {
      delete tempAccount.connection;
      accounts.instanceUser = tempAccount;
    });
}

function createAltInstanceUser() {
  return createTestAccount()
    .then((tempAccount) => createTestScripts(tempAccount, 1))
    .then((tempAccount) => {
      delete tempAccount.connection;
      accounts.alternativeUser = tempAccount;
    });
}

function createNavigationUser() {
  return createTestAccount()
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
    removeCert();
    saveAccountsToFile(accounts);
  });
