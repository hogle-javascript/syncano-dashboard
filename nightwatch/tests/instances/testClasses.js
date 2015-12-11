import globals from '../../globals';
import Syncano from 'syncano';

export default {
  tags: ['classes'],
  before(client) {
    const syncano = new Syncano({accountKey: globals.tempAccountKey, baseUrl: 'https://api.syncano.rocks'});
    const loginPage = client.page.loginPage();
    const classOptions = {
      name: null,
      schema: [
        {type: 'string', name: 'name'}
      ]
    };
    let i = 0;

    for (i; i < 3; i += 1) {
      classOptions.name = `class_${i.toString()}`;
      syncano.instance(globals.tempInstanceName).class().add(classOptions);
    }

    loginPage
      .navigate()
      .login(globals.tempEmail, globals.tempPass);
  },
  after(client) {
    client.end();
  },
  'Test Select/Delete multiple Classes': (client) => {
    const classesPage = client.page.classesPage();

    client.url(`https://localhost:8080/#/instances/${globals.tempInstanceName}/classes`);

    classesPage
      .clickButton('@selectUserClass')
      .clickButton('@multipleSelectButton')
      .clickButton('@selectUserClass');
    client.pause(1000);
    classesPage.clickButton('@deleteButton');
    client.pause(1000);
    classesPage
      .clickButton('@confirmDeleteButton')
      .waitForElementNotVisible('@deleteClassModalTitle');
    const classTableRows = classesPage.elements.classTableRows.selector;
    const userProfileClassName = classesPage.elements.userProfileClassName.selector;

    client.elements('xpath', classTableRows, (result) => {
      client.assert.equal(result.value.length, 0);
    });
    client.elements('xpath', userProfileClassName, (result) => {
      client.assert.equal(result.value.length, 1);
    });
  }
};
