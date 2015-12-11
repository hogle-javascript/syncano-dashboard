import utils from '../../utils';

export default {
  tags: ['SnippetSockets'],
  before(client) {
    const loginPage = client.page.loginPage();

    loginPage
      .navigate()
      .login(process.env.NIGHTWATCH_EMAIL, process.env.NIGHTWATCH_PASSWORD);
  },
  after(client) {
    client.end();
  },
  'User adds a Snippet Socket': (client) => {
    const codeBox = utils.addSuffix('codeBox');
    const socketsPage = client.page.socketsPage();

    socketsPage
      .navigate()
      .waitForElementVisible('@snippetSocketItem')
      .clickButton('@addCodeBoxButton')
      .waitForElementVisible('@addCodeBoxModalTitle')
      .fillInputField('@addCodeBoxModalNameInput', codeBox)
      .selectFromDropdown('@addCodeBoxModalSnippetDropdown', '@addCodeBoxModalSnippetDropdownChoice')
      .clickButton('@confirmButton')
      .waitForElementVisible('@codeBoxTableRow');
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
      .waitForElementVisible('@editCodeBoxModalTitle')
      .fillInputField('@addCodeBoxModalDescriptionInput', 'codeBox_description');
    client.pause(1000);
    socketsPage
      .clickButton('@confirmButton')
      .waitForElementVisible('@codeBoxTableRow')
      .waitForElementVisible('@codeBoxTableRowDescription');
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
      .waitForElementVisible('@deleteCodeBoxModalTitle');
    client.pause(1000);
    socketsPage.clickButton('@confirmButton');
    client.pause(1000);
    socketsPage.waitForElementNotPresent('@selectCodeBoxTableRow');
  }
};
