import Globals from '../../globals';
import Async from 'async';

export default {
  tags: ['classes'],
  after(client) {
    client.end();
  },
  'Test create classes': (client) => {
    Async.waterfall([
      client.createTempAccount,
      client.createTempClass,
      client.createTempClass,
      client.createTempClass
    ], (err) => {
      if (err) throw err;
      const loginPage = client.page.loginPage();

      loginPage
        .navigate()
        .waitForElementPresent('@emailInput', 60000)
        .login(Globals.tempEmail, Globals.tempPass);
    });
  },
  'Test Select/Delete multiple Classes': (client) => {
    const classesPage = client.page.classesPage();

    client
      .url(`https://localhost:8080/#/instances/${Globals.tempInstanceName}/classes`)
      .refresh();
    classesPage
      .clickListItemDropdown('@classesListMenu', 'Select')
      .clickElement('@selectUserClass')
      .clickListItemDropdown('@classesListMenu', 'Delete')
      .clickElement('@confirmDeleteButton')
      .waitForElementVisible('@classTableRows');
    const classTableRows = classesPage.elements.classTableRows.selector;
    const userProfileClassName = classesPage.elements.userProfileClassName.selector;

    client.elements('xpath', classTableRows, (result) => {
      client.assert.equal(result.value.length, 1, 'There is one class left');
    });
    client.elements('xpath', userProfileClassName, (result) => {
      client.assert.equal(result.value.length, 1, 'user_profile class was not deleted');
    });
  }
};
