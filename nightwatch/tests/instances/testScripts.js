import Globals from '../../globals';
import Syncano from 'syncano';

export default {
  tags: ['snippets'],
  before(client) {
    const syncano = new Syncano({accountKey: Globals.tempAccountKey, baseUrl: 'https://api.syncano.rocks'});
    const loginPage = client.page.loginPage();

    const scriptOptions = {
      label: 'script',
      source: 'print "foo"',
      runtime_name: 'python'
    };
    const codeBoxOptions = {
      name: null,
      script: null
    };

    syncano.instance(Globals.tempInstanceName).codebox().add(scriptOptions).then((success) => {
      codeBoxOptions.codebox = success.id;
      for (let i = 0; i < 3; i += 1) {
        codeBoxOptions.name = `codeBox_${i.toString()}`;
        syncano.instance(Globals.tempInstanceName).codeBox().add(codeBoxOptions);
      }
    });
    loginPage
      .navigate()
      .login(Globals.tempEmail, Globals.tempPass);
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
