import Globals from '../../globals';
import Async from 'async';

export default {
  tags: ['snippets'],
  before(client) {
    Async.waterfall([
      client.createTempAccount,
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
    const socketsPage = client.page.socketsPage();

    client.url(`https://localhost:8080/#/instances/${Globals.tempInstanceName}/codeboxes`);

    socketsPage.waitForElementVisible('@codeBoxToSelect');
    socketsPage.clickElement('@codeBoxToSelect');
    socketsPage.clickElement('@selectMultipleButton');

    client.elements('css selector', socketsPage.elements.checkboxSelected.selector, (result) => {
      client.assert.equal(result.value.length, 3);
    });

    socketsPage.clickElement('@deselectMultipleButton');
    socketsPage.waitForElementVisible('@codeBoxToSelect');

    client.elements('css selector', socketsPage.elements.codeBoxToSelect.selector, (result) => {
      client.assert.equal(result.value.length, 3);
    });
  },
  'Test Delete multiple Script Sockets': (client) => {
    const socketsPage = client.page.socketsPage();

    client.url(`https://localhost:8080/#/instances/${Globals.tempInstanceName}/codeboxes`);

    socketsPage.waitForElementVisible('@codeBoxToSelect');
    socketsPage.clickElement('@codeBoxToSelect');
    socketsPage.clickElement('@selectMultipleButton');
    socketsPage.clickElement('@deleteButton');
    socketsPage.waitForElementVisible('@deleteCodeBoxModalTitle');
    socketsPage.clickElement('@confirmButton');
    socketsPage.waitForElementVisible('@emptyListItem');
  }
};
