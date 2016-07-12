import createInstanceUser from './profile/instanceUser.js';
import createAltInstanceUser from './profile/altInstanceUser.js';
import createNavigationUser from './profile/navigationUser.js';

import getCertFile from './files/getCertificate.js';
import saveAccountsToFile from './files/saveAccounts.js';


if (!process.env.NIGHTWATCH_EMAIL || !process.env.NIGHTWATCH_PASSWORD || !process.env.NIGHTWATCH_ACCOUNT_KEY) {
  throw new Error(`Missing exported env variables!!
  Please check if you have exported:
  ο NIGHTWATCH_EMAIL
  ο NIGHTWATCH_PASSWORD
  ο NIGHTWATCH_ACCOUNT_KEY
  `);
} else {
  const accounts = {};

  getCertFile();
  createInstanceUser()
    .then((tempAccount) => accounts.instanceUser = tempAccount)
    .then(createAltInstanceUser)
    .then((tempAccount) => accounts.alternativeUser = tempAccount)
    .then(createNavigationUser)
    .then((tempAccount) => accounts.navigationUser = tempAccount)
    .then(() => {
      console.log('Account details for debugging:\n', accounts);
      saveAccountsToFile(accounts);
    })
    .catch((error) => console.error(error));
}
