import accounts from '../../tempAccounts';
import { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['scripts'],
  before(client) {
    const loginPage = client.page.loginPage();
    const { email, password } = accounts.instanceUser;

    loginPage
      .navigate()
      .setResolution(client)
      .login(email, password);
  },
  after(client) {
    client.end();
  },
  'User goes to Script edit view': (client) => {
    const listsPage = client.page.listsPage();
    const scriptEditPage = client.page.scriptEditPage();
    const { instanceName } = accounts.instanceUser;

    // ToDo: Remove pause when endless loading bug will disappear
    client
      .pause(2500)
      .goToUrl(instanceName, 'scripts');
    listsPage.clickElement('@firstItemRowName');
    scriptEditPage.waitForElementPresent('@scriptEditView');
  },
  'User goes to Script traces view': (client) => {
    const listsPage = client.page.listsPage();
    const scriptEditPage = client.page.scriptEditPage();
    const { instanceName } = accounts.instanceUser;

    client
      .pause(2500)
      .goToUrl(instanceName, 'scripts');
    listsPage.clickElement('@firstItemRowName');
    scriptEditPage.clickElement('@traces');
    scriptEditPage.waitForElementPresent('@tracesEmpty');
  }
});
