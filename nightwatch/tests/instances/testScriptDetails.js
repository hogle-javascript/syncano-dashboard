import Async from 'async';
import globals from '../../globals';

export default {
  tags: ['scripts'],
  before(client) {
    Async.waterfall([
      client.createTempAccount,
      client.createTempInstance,
      client.createTempScript
    ], (err) => {
      if (err) throw err;
      const loginPage = client.page.loginPage();

      loginPage
        .navigate()
        .setResolution(client)
        .login(globals.tempEmail, globals.tempPass);
    });
  },
  after(client) {
    client.end();
  },
  'User goes to Script edit view': (client) => {
    const listsPage = client.page.listsPage();
    const scriptEditPage = client.page.scriptEditPage();

    // ToDo: Remove pause when endless loarding bug will disappear
    client
      .pause(2500)
      .goToUrl('temp', 'scripts');
    listsPage.clickElement('@firstItemRowName');
    scriptEditPage.waitForElementPresent('@scriptEditView');
  },
  'User goes to Script traces view': (client) => {
    const listsPage = client.page.listsPage();
    const scriptEditPage = client.page.scriptEditPage();

    client
      .pause(2500)
      .goToUrl('temp', 'scripts');
    listsPage.clickElement('@firstItemRowName');
    scriptEditPage.clickElement('@traces');
    scriptEditPage.waitForElementPresent('@tracesEmpty');
  }
};
