import utils from '../utils';
import globals from '../globals';
import Syncano from 'syncano';

export default {
  tags: ['webhooks'],
  before(client) {
    const syncano = new Syncano({accountKey: globals.tempAccountKey, baseUrl: 'https://api.syncano.rocks'});
    const loginPage = client.page.loginPage();

    const cb_options = {
      'label': 'codebox',
      'source': 'print "foo"',
      'runtime_name': 'python'
    }
    const webhook_options = {
      'name': null,
      'codebox': null,
    }
    let i = 0;

    syncano.instance(globals.tempInstanceName).codebox().add(cb_options).then((success) => {
      webhook_options.codebox = success.id;
      for (i; i < 3; i += 1) {
        webhook_options.name = `webhook_${i.toString()}`;
        syncano.instance(globals.tempInstanceName).webhook().add(webhook_options);
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
    const dataPage = client.page.dataPage();

    client.url(`https://localhost:8080/#/instances/${globals.tempInstanceName}/webhooks`);

    dataPage
      .waitForElementVisible('@webhookToSelect')
      .clickButton('@webhookToSelect')
      .clickButton('@selectMultipleButton');

    client.elements('css selector', dataPage.elements.checkboxSelected.selector, (result) => {
      client.assert.equal(result.value.length, 3);
    });

    dataPage
      .clickButton('@deselectMultipleButton')
      .waitForElementVisible('@webhookToSelect');

    client.elements('css selector', dataPage.elements.webhookToSelect.selector, (result) => {
      client.assert.equal(result.value.length, 3);
    });  
  },
    'Test Delete multiple Webhooks': (client) => {
    const dataPage = client.page.dataPage();

    client.url(`https://localhost:8080/#/instances/${globals.tempInstanceName}/webhooks`);

    dataPage
      .waitForElementVisible('@webhookToSelect')
      .clickButton('@webhookToSelect')
      .clickButton('@selectMultipleButton')
      .clickButton('@deleteButton')
      .waitForElementVisible('@deleteWebhookModalTitle');

    client.pause(1000);

    dataPage
      .clickButton('@confirmButton')
      .waitForElementVisible('@emptyListItem');
  }
};
