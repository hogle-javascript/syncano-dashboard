'use strict';

function createTestApiKey(tempAccount, keyAmount) {
  let apiKey = [];
  let apiKeyNames = [];

  for (var i = 0; i < keyAmount; i++) {
    const description = `apiKey_${Date.now() + i}`;
    apiKeyNames.push(description);
    apiKey.push(tempAccount.connection.ApiKey({
      description
    }));
  }

  return tempAccount.connection.ApiKey
    .please()
    .bulkCreate(apiKey)
    .then((response) => {
      tempAccount.tempApiKeyNames = apiKeyNames;
      return tempAccount;
    })
    .catch((error) => console.log(error));
}

module.exports = createTestApiKey;
