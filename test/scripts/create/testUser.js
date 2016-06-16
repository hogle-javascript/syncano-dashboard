'use strict';

function createTestUsers(tempAccount, userAmount) {
  let users = [];
  let usersNames = [];

  for (var i = 0; i < userAmount; i++) {
    const password = String(Date.now() + i);
    const username = `user_${password}`;
    usersNames.push(username);
    users.push(tempAccount.connection.User({
      username,
      password
    }));
  }

  return tempAccount.connection.User
    .please()
    .bulkCreate(users)
    .then((response) => {
      tempAccount.tempUserNames = usersNames;
      return tempAccount;
    })
    .catch((error) => console.log(error));
}

module.exports = createTestUsers;
