const utils = require('../utils');

module.exports = {
  tags: ['webhooks'],
  before: function(client) {
    const loginPage = client.page.loginPage();

    loginPage.goToLoginPage();
    loginPage.typeEmail();
    loginPage.typePassword();
    loginPage.clickSignInButton();
    loginPage.verifyLoginSuccessful();

  },
  after: function(client) {
    client.end();
  },
  'User adds a Webhook' : function(client) {
    const webhook = utils.addSuffix('webhook');
    const dataPage = client.page.dataPage();

    dataPage.navigate();
    dataPage.waitForElementVisible('@webhookListItem');
    dataPage.clickButton('@addWebhookButton');
    dataPage.waitForElementVisible('@addWebhookModalTitle');
    dataPage.fillInputField('@addWebhookModalNameInput', webhook);
    dataPage.selectFromDropdown('@addWebhookModalCodeboxDropdown', '@addWebhookModalCodeboxDropdownChoice');
    dataPage.clickButton('@confirmButton');
    dataPage.waitForElementVisible('@webhookTableRow');
  },
  'User edits a Webhook' : function(client) {
    const dataPage = client.page.dataPage();

    dataPage.navigate();
    dataPage.waitForElementVisible('@webhookListItem');
    dataPage.clickButton('@selectWebhookTableRow');
    dataPage.clickButton('@editButton');
    dataPage.waitForElementVisible('@editWebhookModalTitle');
    dataPage.fillInputField('@addWebhookModalDescriptionInput', 'webhook_description');
    client.pause(1000);
    dataPage.clickButton('@confirmButton');
    dataPage.waitForElementVisible('@webhookTableRow');
    dataPage.waitForElementVisible('@webhookTableRowDescription')
  },
  'User deletes a Webhook' : function(client) {
    const dataPage = client.page.dataPage();

    dataPage.navigate();
    dataPage.waitForElementVisible('@webhookListItem');
    dataPage.clickButton('@selectWebhookTableRow');
    dataPage.clickButton('@deleteButton');
    dataPage.waitForElementVisible('@deleteWebhookModalTitle');
    client.pause(1000);
    dataPage.clickButton('@confirmButton');
    dataPage.waitForElementNotPresent('@selectWebhookTableRow');
  }
};
