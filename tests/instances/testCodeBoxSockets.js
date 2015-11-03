import utils from '../utils';

export default {
  tags: ['codeBoxSockets'],
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
    const socketsPage = client.page.socketsPage();

    socketsPage
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
    const socketsPage = client.page.socketsPage();

    socketsPage
      .navigate()
      .waitForElementVisible('@webhookListItem')
      .clickWebhookDropdown()
      .clickButton('@editDropdownItem')
      .waitForElementVisible('@editWebhookModalTitle')
      .fillInputField('@addWebhookModalDescriptionInput', 'webhook_description');
    client.pause(1000);
    socketsPage
      .clickButton('@confirmButton')
      .waitForElementVisible('@webhookTableRow')
      .waitForElementVisible('@webhookTableRowDescription');
  },
  'User deletes a Webhook': (client) => {
    const socketsPage = client.page.socketsPage();

    socketsPage
     .navigate()
     .waitForElementVisible('@webhookListItem')
     .clickWebhookDropdown()
     .clickButton('@deleteDropdownItem')
     .waitForElementVisible('@deleteWebhookModalTitle');
    client.pause(1000);
    socketsPage
      .clickButton('@confirmButton')
      .waitForElementNotPresent('@selectWebhookTableRow');
  }
};
