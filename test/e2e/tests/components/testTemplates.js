import accounts from '../../tempAccounts';
import { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['templates'],
  after(client) {
    client.end();
  },
  before(client) {
    const loginPage = client.page.loginPage();
    const { email, password } = accounts.instanceUser;

    loginPage
      .navigate()
      .setResolution(client)
      .login(email, password);
  },
  'Test Select/Deselect multiple Templates': (client) => {
    const listsPage = client.page.listsPage();
    const selectedItems = listsPage.elements.selectedItem.selector;
    const instanceName = accounts.instanceUser.instanceName;

    listsPage
      .goToUrl(instanceName, 'templates')
      .clickListItemDropdown('@optionsMenu', 'Select')
      .assertSelectedCount('xpath', selectedItems, 2);

    client
      .pause(2000);

    listsPage
      .clickListItemDropdown('@optionsMenu', 'Unselect')
      .assertSelectedCount('xpath', selectedItems, 0);
  },
  'Test Delete multiple Templates': (client) => {
    const listsPage = client.page.listsPage();

    client
      .pause(2000);

    listsPage
      .clickListItemDropdown('@optionsMenu', 'Select');

    client
      .pause(2000);

    listsPage
      .clickListItemDropdown('@optionsMenu', 'Delete')
      .clickElement('@confirmButton')
      .waitForElementVisible('@emptyListItem');
  }
});
