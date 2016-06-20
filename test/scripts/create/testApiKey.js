export default function createTestApiKey(tempAccount, keyAmount) {
  const apiKey = [];
  const apiKeyNames = [];
  let i;

  for (i = 0; i < keyAmount; i++) {
    const description = `apiKey_${Date.now() + i}`;
    apiKeyNames.push(description);
    apiKey.push(tempAccount.connection.ApiKey({
      description
    }));
  }

  return tempAccount.connection.ApiKey
    .please()
    .bulkCreate(apiKey)
    .then(() => {
      tempAccount.tempApiKeyNames = apiKeyNames;
      return tempAccount;
    })
    .catch((error) => console.log(error));
}
