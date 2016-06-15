import accounts from '../../tempAccounts';

export default {
  tags: ['classes'],
  after(client) {
    client.end();
  },
  'Test create classes': (client) => {
    const loginPage = client.page.loginPage();

    loginPage
      .navigate()
      .setResolution(client)
      .login(accounts.instanceUser.email, accounts.instanceUser.password);
  },
  'Test Select/Delete multiple Classes': (client) => {
    const classesPage = client.page.classesPage();
    const instanceName = accounts.instanceUser.instanceName;

    classesPage
      .goToUrl(instanceName, 'classes')
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
