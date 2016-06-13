import utils from '../../utils';
import accounts from '../../tempAccounts';

export default {
  tags: ['scriptSockets'],
  before(client) {
    const loginPage = client.page.loginPage();

    loginPage
      .navigate()
      .setResolution(client)
      .login(accounts.instanceUser.email, accounts.instanceUser.password);
  },
  after(client) {
    client.end();
  },
  'User adds a Script Socket': (client) => {
    const socketsPage = client.page.socketsPage();
    const script = utils.addSuffix('script');

    client.url('https://localhost:8080/#/instances/' + accounts.instanceUser.instanceName + '/script-endpoints');

    socketsPage
      // .goToUrl('', 'script-endpoints')
      .clickElement('@addScriptButton')
      .fillInput('@modalNameInput', script)
      .selectDropdownValue('@addCodeBoxModalScriptDropdown', accounts.instanceUser.tempScriptNames[0])
      .clickElement('@confirmButton')
      .waitForElementVisible('@codeBoxTableRow');
  },
  'User edits a Script Socket': (client) => {
    const socketsPage = client.page.socketsPage();
    const edited = utils.addSuffix('edited');

    socketsPage
      // .waitForElementVisible('@codeBoxSocketItem')
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
      // .waitForElementVisible('@codeBoxSocketItem')
      .clickListItemDropdown(script, 'Delete')
      .waitForElementVisible('@deleteCodeBoxModalTitle')
      .clickElement('@confirmButton')
      .waitForElementNotPresent('@codeBoxTableRow');
  }
};
