import utils from '../../utils';

export default {
  tags: ['scriptSockets'],
  before(client) {
    const loginPage = client.page.loginPage();

    loginPage.navigate();
    client.resizeWindow(1280, 1024);
    loginPage.login(process.env.NIGHTWATCH_EMAIL, process.env.NIGHTWATCH_PASSWORD);
  },
  after(client) {
    client.end();
  },
  'User adds a Script Socket': (client) => {
    const socketsPage = client.page.socketsPage();
    const script = utils.addSuffix('script');

    socketsPage
      .goToUrl('', 'script-endpoints')
      .clickElement('@addScriptButton')
      .fillInput('@modalNameInput', script)
      .selectDropdownValue('@addCodeBoxModalScriptDropdown', 'snippet')
      .clickElement('@confirmButton')
      .waitForElementVisible('@codeBoxTableRow');
  },
  'User edits a Script Socket': (client) => {
    const socketsPage = client.page.socketsPage();
    const edited = utils.addSuffix('edited');

    socketsPage
      .goToUrl('', 'script-endpoints')
      .waitForElementVisible('@codeBoxSocketItem')
      .clickListItemDropdown(utils.addSuffix('script'), 'Edit')
      .waitForElementVisible('@editCodeBoxModalTitle')
      .fillInput('@modalDescriptionInput', edited)
      .clickElement('@confirmButton')
      .waitForElementVisible('@codeBoxTableRow')
      .waitForElementVisible('@codeBoxTableRowDescription');

    socketsPage.verify.containsText('@codeBoxTableRowDescription', edited);
  },
  'User deletes a Script Socket': (client) => {
    const socketsPage = client.page.socketsPage();
    const script = utils.addSuffix('script');

    socketsPage
      .goToUrl('', 'script-endpoints')
      .waitForElementVisible('@codeBoxSocketItem')
      .clickListItemDropdown(script, 'Delete')
      .waitForElementVisible('@deleteCodeBoxModalTitle')
      .clickElement('@confirmButton')
      .waitForElementNotPresent('@codeBoxTableRow');
  }
};
