import Globals from '../../globals';
import Syncano from 'syncano';

export default {
  tags: ['snippets'],
  before(client) {
    const syncano = new Syncano({accountKey: globals.tempAccountKey, baseUrl: 'https://api.syncano.rocks'});
    const loginPage = client.page.loginPage();

    const snippetOptions = {
      label: 'snippet',
      source: 'print "foo"',
      runtime_name: 'python'
    };
    const codeBoxOptions = {
      name: null,
      snippet: null
    };

    syncano.instance(globals.tempInstanceName).codebox().add(snippetOptions).then((success) => {
      codeBoxOptions.codebox = success.id;
      for (let i = 0; i < 3; i += 1) {
        codeBoxOptions.name = `codeBox_${i.toString()}`;
        syncano.instance(globals.tempInstanceName).codeBox().add(codeBoxOptions);
      }
    });
    loginPage
      .navigate()
      .login(Globals.tempEmail, Globals.tempPass);
  },
  after(client) {
    client.end();
  },
  'Test Select/Deselect multiple CodeBoxes': (client) => {
    const socketsPage = client.page.socketsPage();

    client.url(`https://localhost:8080/#/instances/${globals.tempInstanceName}/codeboxes`);

    socketsPage
      .waitForElementVisible('@codeBoxToSelect')
      .clickButton('@codeBoxToSelect')
      .clickButton('@selectMultipleButton');

    client.elements('css selector', socketsPage.elements.checkboxSelected.selector, (result) => {
      client.assert.equal(result.value.length, 3);
    });

    socketsPage
      .clickButton('@deselectMultipleButton')
      .waitForElementVisible('@codeBoxToSelect');

    client.elements('css selector', socketsPage.elements.codeBoxToSelect.selector, (result) => {
      client.assert.equal(result.value.length, 3);
    });
  },
  'Test Delete multiple CodeBoxes': (client) => {
    const socketsPage = client.page.socketsPage();

    client.url(`https://localhost:8080/#/instances/${globals.tempInstanceName}/codeboxes`);

    socketsPage
      .waitForElementVisible('@codeBoxToSelect')
      .clickButton('@codeBoxToSelect')
      .clickButton('@selectMultipleButton')
      .clickButton('@deleteButton')
      .waitForElementVisible('@deleteCodeBoxModalTitle');

    client.pause(1000);

    socketsPage
      .clickButton('@confirmButton')
      .waitForElementVisible('@emptyListItem');
  }
};
