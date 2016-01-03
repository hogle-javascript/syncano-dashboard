import Utils from '../../utils';

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
    const socketsPage = client.page.socketsPage();
    const codeBox = Utils.addSuffix('codeBox');

    socketsPage
      .navigate()
      .waitForElementVisible('@codeBoxSocketItem')
      .clickElement('@addCodeBoxButton')
      .waitForElementVisible('@addCodeBoxModalTitle')
      .fillInput('@modalNameInput', codeBox)
      .selectDropdownValue('@addCodeBoxModalSnippetDropdown', 'snippet')
      .clickElement('@confirmButton')
      .waitForElementVisible('@codeBoxTableRow');
  },
  'User edits a CodeBox Socket': (client) => {
    const socketsPage = client.page.socketsPage();
    const edited = Utils.addSuffix('edited');

    socketsPage
      .navigate()
      .waitForElementVisible('@codeBoxSocketItem')
      .clickElement('@codeBoxSocketDropDown')
      .clickElement('@editDropdownItem')
      .waitForElementVisible('@editCodeBoxModalTitle')
      .fillInput('@modalDescriptionInput', edited)
      .clickElement('@confirmButton')
      .waitForElementVisible('@codeBoxTableRow')
      .waitForElementVisible('@codeBoxTableRowDescription');

    socketsPage.verify.containsText('@codeBoxTableRowDescription', edited);
  },
  'User deletes a CodeBox Socket': (client) => {
    const socketsPage = client.page.socketsPage();

    socketsPage
      .navigate()
      .waitForElementVisible('@codeBoxSocketItem')
      .clickElement('@codeBoxSocketDropDown')
      .clickElement('@deleteDropdownItem')
      .waitForElementVisible('@deleteCodeBoxModalTitle')
      .clickElement('@confirmButton')
      .waitForElementNotPresent('@selectCodeBoxTableRow');
  }
};
