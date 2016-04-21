import Globals from '../../globals';
import Async from 'async';

export default {
  tags: ['snippets'],
  before(client) {
    Async.waterfall([
      client.createTempAccount,
      client.createTempScript,
      client.createTempScript,
      client.createTempScript
    ], (err) => {
      if (err) throw err;
      const loginPage = client.page.loginPage();

      loginPage
        .navigate()
        .login(Globals.tempEmail, Globals.tempPass);
    });
  },
  after(client) {
    client.end();
  },
  'Test Select/Deselect multiple Script Sockets': (client) => {
    const scriptsPage = client.page.scriptsPage();
    const tempUrl = `https://localhost:8080/#/instances/${Globals.tempInstanceName}/scripts`;

    client.url(tempUrl);

    scriptsPage
      .waitForElementVisible('@codeBoxToSelect')
      .clickElement('@codeBoxToSelect')
      .clickElement('@selectMultipleButton');

    client.elements('css selector', scriptsPage.elements.checkboxSelected.selector, (result) => {
      client.assert.equal(result.value.length, 3);
    });

    scriptsPage
      .waitForElementVisible('@codeBoxToSelect');
    client
      .pause(2000);
    scriptsPage
      .clickElement('@codeBoxToSelect')
      .clickElement('@deselectMultipleButton');

    client.elements('css selector', scriptsPage.elements.checkboxSelected.selector, (result) => {
      client.assert.equal(result.value.length, 0);
    });
  },
  'Test Delete multiple Script Sockets': (client) => {
    const scriptsPage = client.page.scriptsPage();
    const tempUrl = `https://localhost:8080/#/instances/${Globals.tempInstanceName}/scripts`;

    client
      .url(tempUrl)
      .pause(2000);

    scriptsPage
      .waitForElementVisible('@codeBoxToSelect')
      .clickElement('@codeBoxToSelect')
      .clickElement('@selectMultipleButton');
    client
      .pause(2000);
    scriptsPage
      .clickElement('@codeBoxToSelect')
      .clickElement('@deleteButton')
      .waitForElementVisible('@deleteCodeBoxModalTitle')
      .clickElement('@confirmButton')
      .waitForElementVisible('@emptyListItem');
  }
};
