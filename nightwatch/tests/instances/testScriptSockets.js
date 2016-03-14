import Utils from '../../utils';

export default {
  tags: ['scriptSockets'],
  before(client) {
    const loginPage = client.page.loginPage();

    loginPage
      .navigate()
      .login(process.env.NIGHTWATCH_EMAIL, process.env.NIGHTWATCH_PASSWORD);
  },
  after(client) {
    client.end();
  },
  'User adds a Script Socket': (client) => {
    const socketsPage = client.page.socketsPage();
    const script = Utils.addSuffix('script');

    socketsPage
      .navigate()
      .waitForElementVisible('@codeBoxSocketItem')
      .clickElement('@addCodeBoxButton')
      .waitForElementVisible('@addCodeBoxModalTitle')
      .fillInput('@modalNameInput', script)
      .selectDropdownValue('@addCodeBoxModalScriptDropdown', 'snippet')
      .clickElement('@confirmButton')
      .waitForElementVisible('@codeBoxTableRow');
  },
  'User edits a Script Socket': (client) => {
    const socketsPage = client.page.socketsPage();
    const edited = Utils.addSuffix('edited');

    socketsPage
      .navigate()
      .waitForElementVisible('@codeBoxSocketItem')
      .clickListItemDropdown(Utils.addSuffix('script'), 'Edit')
      .waitForElementVisible('@editCodeBoxModalTitle')
      .fillInput('@modalDescriptionInput', edited)
      .clickElement('@confirmButton')
      .waitForElementVisible('@codeBoxTableRow')
      .waitForElementVisible('@codeBoxTableRowDescription');

    socketsPage.verify.containsText('@codeBoxTableRowDescription', edited);
  },
  'User deletes a Script Socket': (client) => {
    const socketsPage = client.page.socketsPage();
    const script = Utils.addSuffix('script');

    socketsPage
      .navigate()
      .waitForElementVisible('@codeBoxSocketItem')
      .clickListItemDropdown(script, 'Delete')
      .waitForElementVisible('@deleteCodeBoxModalTitle')
      .clickElement('@confirmButton')
      .waitForElementNotPresent('@codeBoxTableRow');
  }
};
