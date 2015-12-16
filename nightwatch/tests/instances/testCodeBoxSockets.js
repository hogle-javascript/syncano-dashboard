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

    socketsPage
      .navigate()
      .waitForElementVisible('@codeBoxSocketItem')
      .clickButton('@addCodeBoxButton')
      .waitForElementVisible('@addCodeBoxModalTitle')
      .fillInputField('@modalNameInput', codeBox)
      .selectFromDropdown('@addCodeBoxModalSnippetDropdown', '@addCodeBoxModalSnippetDropdownChoice')
      .clickButton('@confirmButton')
      .waitForElementVisible('@codeBoxTableRow');
  },
  'User edits a CodeBox Socket': (client) => {
    const socketsPage = client.page.socketsPage();

    socketsPage
      .navigate()
      .waitForElementVisible('@codeBoxSocketItem')
      .clickButton('@codeBoxSocketDropDown');
    client.pause(1000);

    socketsPage
      .clickButton('@editDropdownItem')
      .waitForElementVisible('@editCodeBoxModalTitle')
      .fillInputField('@modalDescriptionInput', 'codeBox_description');
    client.pause(1000);
    socketsPage
      .clickButton('@confirmButton')
      .waitForElementVisible('@codeBoxTableRow')
      .waitForElementVisible('@codeBoxTableRowDescription');
  },
  'User deletes a CodeBox Socket': (client) => {
    const socketsPage = client.page.socketsPage();

    socketsPage
      .navigate()
      .waitForElementVisible('@codeBoxSocketItem')
      .clickButton('@codeBoxSocketDropDown');
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
