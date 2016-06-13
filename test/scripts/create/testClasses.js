'use strict';

function createTestClasses(tempAccount, classAmount) {
  let classes = [];
  let classesNames = [];

  for (var i = 0; i < classAmount; i++) {
    const name = 'class_' + Date.now() + i;
    classesNames.push(name);
    classes.push(tempAccount.connection.Class({
      name,
      schema: [
        {type: 'string', name}
      ]
    }));
  }

  return tempAccount.connection.Class
    .please()
    .bulkCreate(classes)
    .then((response) => {
      tempAccount.tempClassNames = classesNames;
      return tempAccount;
    })
    .catch((error) => console.log(error));
}

module.exports = createTestClasses;
