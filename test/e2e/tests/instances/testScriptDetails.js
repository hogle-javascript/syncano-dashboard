import accounts from '../../tempAccounts';

export default {
  tags: ['scripts'],
  before(client) {
    const loginPage = client.page.loginPage();

    loginPage
      .navigate()
      .setResolution(client)
      .login(accounts.instanceUser.email, accounts.instanceUser.password);
  },
  after(client) {
    client.end();
  },
  'User goes to Script edit view': (client) => {
    const listsPage = client.page.listsPage();
    const scriptEditPage = client.page.scriptEditPage();
    const instanceName = accounts.instanceUser.instanceName;

    // ToDo: Remove pause when endless loarding bug will disappear
    client
      .pause(2500)
      .goToUrl(instanceName, 'scripts');
    listsPage.clickElement('@firstItemRowName');
    scriptEditPage.waitForElementPresent('@scriptEditView');
  },
  'User goes to Script traces view': (client) => {
    const listsPage = client.page.listsPage();
    const scriptEditPage = client.page.scriptEditPage();
    const instanceName = accounts.instanceUser.instanceName;

    client
      .pause(2500)
      .goToUrl(instanceName, 'scripts');
    listsPage.clickElement('@firstItemRowName');
    scriptEditPage.clickElement('@traces');
    scriptEditPage.waitForElementPresent('@tracesEmpty');
  }
};
