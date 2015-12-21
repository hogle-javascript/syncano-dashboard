import utils from '../../utils';

export default {
  tags: ['codeBoxSockets'],
  before(client) {
    const loginPage = client.page.loginPage();

    loginPage
      .navigate()
      .login(process.env.NIGHTWATCH_EMAIL, process.env.NIGHTWATCH_PASSWORD);
  },
  after(client) {
    client.end();
  },
  'User adds a CodeBox Socket': (client) => {
    const codeBox = utils.addSuffix('codebox');
    const socketsPage = client.page.socketsPage();

    socketsPage.navigate();
    socketsPage.waitForElementVisible('@codeBoxSocketItem');
    socketsPage.clickButton('@addCodeBoxButton', client);
    socketsPage.waitForElementVisible('@addCodeBoxModalTitle');
    socketsPage.fillInputField('@modalNameInput', codeBox, client);
    socketsPage.selectFromDropdown('@addCodeBoxModalSnippetDropdown', '@addCodeBoxModalSnippetDropdownChoice', client);
    socketsPage.clickButton('@confirmButton', client);
    socketsPage.waitForElementVisible('@codeBoxTableRow');
  },
  'User edits a CodeBox Socket': (client) => {
    const socketsPage = client.page.socketsPage();

    socketsPage.navigate();
    socketsPage.waitForElementVisible('@codeBoxSocketItem');
    socketsPage.clickButton('@codeBoxSocketDropDown', client);
    socketsPage.clickButton('@editDropdownItem', client);
    socketsPage.waitForElementVisible('@editCodeBoxModalTitle');
    socketsPage.fillInputField('@modalDescriptionInput', 'codeBox_description', client);
    socketsPage.clickButton('@confirmButton', client);
    socketsPage.waitForElementVisible('@codeBoxTableRow');
    socketsPage.waitForElementVisible('@codeBoxTableRowDescription');
  },
  'User deletes a CodeBox Socket': (client) => {
    const socketsPage = client.page.socketsPage();

    socketsPage.navigate();
    socketsPage.waitForElementVisible('@codeBoxSocketItem');
    socketsPage.clickButton('@codeBoxSocketDropDown', client);
    socketsPage.clickButton('@deleteDropdownItem', client);
    socketsPage.waitForElementVisible('@deleteCodeBoxModalTitle');
    socketsPage.clickButton('@confirmButton', client);
    socketsPage.waitForElementNotPresent('@selectCodeBoxTableRow');
  }
};
