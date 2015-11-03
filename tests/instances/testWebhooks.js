import globals from '../globals';
import Syncano from 'syncano';

export default {
  tags: ['webhooks'],
  before(client) {
    const syncano = new Syncano({accountKey: globals.tempAccountKey, baseUrl: 'https://api.syncano.rocks'});
    const loginPage = client.page.loginPage();

    const codeBoxOptions = {
      label: 'codebox',
      source: 'print "foo"',
      runtime_name: 'python'
    };
    const webhookOptions = {
      name: null,
      codebox: null
    };

    syncano.instance(globals.tempInstanceName).codebox().add(codeBoxOptions).then((success) => {
      webhookOptions.codebox = success.id;
      for (let i = 0; i < 3; i += 1) {
        webhookOptions.name = `webhook_${i.toString()}`;
        syncano.instance(globals.tempInstanceName).webhook().add(webhookOptions);
      }
    });

    loginPage
      .navigate()
      .login(globals.tempEmail, globals.tempPass)
      .verifyLoginSuccessful();
  },
  after(client) {
    client.end();
  },
  'Test Select/Deselect multiple Webhooks': (client) => {
    const socketsPage = client.page.socketsPage();

    client.url(`https://localhost:8080/#/instances/${globals.tempInstanceName}/webhooks`);

    socketsPage
      .waitForElementVisible('@webhookToSelect')
      .clickButton('@webhookToSelect')
      .clickButton('@selectMultipleButton');

    client.elements('css selector', socketsPage.elements.checkboxSelected.selector, (result) => {
      client.assert.equal(result.value.length, 3);
    });

    socketsPage
      .clickButton('@deselectMultipleButton')
      .waitForElementVisible('@webhookToSelect');

    client.elements('css selector', socketsPage.elements.webhookToSelect.selector, (result) => {
      client.assert.equal(result.value.length, 3);
    });
  },
  'Test Delete multiple Webhooks': (client) => {
    const socketsPage = client.page.socketsPage();

    client.url(`https://localhost:8080/#/instances/${globals.tempInstanceName}/webhooks`);

    socketsPage
      .waitForElementVisible('@webhookToSelect')
      .clickButton('@webhookToSelect')
      .clickButton('@selectMultipleButton')
      .clickButton('@deleteButton')
      .waitForElementVisible('@deleteWebhookModalTitle');

    client.pause(1000);

    socketsPage
      .clickButton('@confirmButton')
      .waitForElementVisible('@emptyListItem');
  }
};
