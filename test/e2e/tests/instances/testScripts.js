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
        .setResolution(client)
        .login(Globals.tempEmail, Globals.tempPass);
    });
  },
  after(client) {
    client.end();
  },
  'Test Select/Deselect multiple Scripts': (client) => {
    const scriptsPage = client.page.scriptsPage();

    // ToDO: Delete client.pause after dissappearing of scripts will be solved
    client.goToUrl('temp', 'scripts');

    scriptsPage
      .waitForElementVisible('@scriptMenuSelect')
      .clickListItemDropdown('@scriptMenuSelect', 'Select');

    client.elements('css selector', scriptsPage.elements.scriptsSelected.selector, (result) => {
      client.assert.equal(result.value.length, 3);
    });

    scriptsPage
      .waitForElementVisible('@scriptMenuSelect');
    client
      .pause(2000);
    scriptsPage
      .clickListItemDropdown('@scriptMenuSelect', 'Unselect');

    client.elements('css selector', scriptsPage.elements.scriptsSelected.selector, (result) => {
      client.assert.equal(result.value.length, 0);
    });
  },
  'Test Delete multiple Scripts': (client) => {
    const scriptsPage = client.page.scriptsPage();
    const tempUrl = `https://localhost:8080/#/instances/${Globals.tempInstanceName}/scripts`;

    client
      .url(tempUrl)
      .pause(2000);

    scriptsPage
      .clickListItemDropdown('@scriptMenuSelect', 'Select');
    client
      .pause(2000);
    scriptsPage
      .clickListItemDropdown('@scriptMenuSelect', 'Delete')
      .waitForElementVisible('@deleteScriptsDialogTitle')
      .clickElement('@confirmButton')
      .waitForElementVisible('@emptyListItem');
  }
};
