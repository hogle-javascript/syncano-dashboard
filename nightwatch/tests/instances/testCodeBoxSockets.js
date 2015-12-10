import utils from '../utils';

export default {
  tags: ['SnippetSockets'],
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
  'User adds a Snippet Socket': (client) => {
    const webhook = utils.addSuffix('webhook');
    const socketsPage = client.page.socketsPage();

    socketsPage
      .navigate()
      .waitForElementVisible('@snippetSocketItem')
      .clickButton('@addWebhookButton')
      .waitForElementVisible('@addWebhookModalTitle')
      .fillInputField('@addWebhookModalNameInput', webhook)
      .selectFromDropdown('@addWebhookModalSnippetDropdown', '@addWebhookModalSnippetDropdownChoice')
      .clickButton('@confirmButton')
      .waitForElementVisible('@webhookTableRow');
  },
  'User edits a Snippet Socket': (client) => {
    const socketsPage = client.page.socketsPage();

    socketsPage
      .navigate()
      .waitForElementVisible('@snippetSocketItem')
      .clickButton('@snippetSocketDropDown');
    client.pause(1000);

    socketsPage
      .clickButton('@editDropdownItem')
      .waitForElementVisible('@editWebhookModalTitle')
      .fillInputField('@addWebhookModalDescriptionInput', 'webhook_description');
    client.pause(1000);
    socketsPage
      .clickButton('@confirmButton')
      .waitForElementVisible('@webhookTableRow')
      .waitForElementVisible('@webhookTableRowDescription');
  },
  'User deletes a Snippet Socket': (client) => {
    const socketsPage = client.page.socketsPage();

    socketsPage
      .navigate()
      .waitForElementVisible('@snippetSocketItem')
      .clickButton('@snippetSocketDropDown');
    client.pause(1000);

    socketsPage
      .clickButton('@deleteDropdownItem')
      .waitForElementVisible('@deleteWebhookModalTitle');
    client.pause(1000);
    socketsPage
      .clickButton('@confirmButton')
      .waitForElementNotPresent('@selectWebhookTableRow');
  }
};
