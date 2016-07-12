import accounts from '../../tempAccounts';
import utils, { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['instance'],
  before(client) {
    const loginPage = client.page.loginPage();
    const { email, password } = accounts.instanceUser;

    loginPage
      .navigate()
      .setResolution(client)
      .login(email, password);
  },
  after(client) {
    client.end();
  },
  'Check if Instance has been created': (client) => {
    const instancesPage = client.page.instancesPage();

    instancesPage
      .waitForElementNotPresent('@setupText')
      .navigate()
      .waitForElementNotPresent('@emptyListItem')
      .waitForElementVisible('@selectInstance');
  },
  'Test Edit Instance': (client) => {
    const instancesPage = client.page.instancesPage();
    const newDescription = utils.addSuffix('description');

    instancesPage
      .navigate()
      .clickListItemDropdown('@instanceDropdown', 'Edit')
      .fillInput('@createModalDescriptionInput', newDescription)
      .clickElement('@confirmButton')
      .waitForElementNotPresent('@editInstanceModalTitle')
      .waitForElementVisible('@instancesTableName');

    instancesPage.expect.element('@instancesTableRow').to.contain.text(newDescription);
  },
  'Test Delete Instance': (client) => {
    const instancesPage = client.page.instancesPage();
    const { tempInstanceNames } = accounts.instanceUser;

    instancesPage.navigate();
    client.pause(1000);

    instancesPage
      .clickListItemDropdown('@instanceDropdown', 'Delete')
      .fillInput('@confirmTextField', tempInstanceNames[tempInstanceNames.length - 1])
      .clickElement('@confirmDeleteButton')
      .waitForElementNotPresent('@deleteInstanceModalTitle');
  }
});
