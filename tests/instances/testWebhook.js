import utils from '../utils';

export default {
  tags: ['webhook'],
  before(client) {
    const loginPage = client.page.loginPage();

    loginPage
      .navigate()
      .typeEmail()
      .typePassword()
      .clickSignInButton()
      .verifyLoginSuccessful();
  },
  after(client) {
    client.end();
  },
  'User adds a Webhook': (client) => {
    const webhook = utils.addSuffix('webhook');
    const dataPage = client.page.dataPage();

    dataPage
      .navigate()
      .waitForElementVisible('@webhookListItem')
      .clickButton('@addWebhookButton')
      .waitForElementVisible('@addWebhookModalTitle')
      .fillInputField('@addWebhookModalNameInput', webhook)
      .selectFromDropdown('@addWebhookModalCodeboxDropdown', '@addWebhookModalCodeboxDropdownChoice')
      .clickButton('@confirmButton')
      .waitForElementVisible('@webhookTableRow');
  },
  'User edits a Webhook': (client) => {
    const dataPage = client.page.dataPage();

    dataPage
      .navigate()
      .waitForElementVisible('@webhookListItem')
      .clickWebhookDropdown()
      .clickButton('@editDropdownItem')
      .waitForElementVisible('@editWebhookModalTitle')
      .fillInputField('@addWebhookModalDescriptionInput', 'webhook_description');
    client.pause(1000);
    dataPage
      .clickButton('@confirmButton')
      .waitForElementVisible('@webhookTableRow')
      .waitForElementVisible('@webhookTableRowDescription');
  },
  'User deletes a Webhook': (client) => {
    const dataPage = client.page.dataPage();

    dataPage
     .navigate()
     .waitForElementVisible('@webhookListItem')
     .clickButton('@selectWebhookTableRow')
     .clickButton('@deleteButton')
     .waitForElementVisible('@deleteWebhookModalTitle');
    client.pause(1000);
    dataPage
      .clickButton('@confirmButton')
      .waitForElementNotPresent('@selectWebhookTableRow');
  }
};
