import accounts from '../../tempAccounts';

export default {
  tags: ['snippets'],
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
  'Test Select/Deselect multiple Scripts': (client) => {
    const listsPage = client.page.listsPage();
    const selectedItems = listsPage.elements.selectedItem.selector;
    const optionsMenu = listsPage.elements.optionsMenu.selector;
    const instanceName = accounts.instanceUser.instanceName;

    client
      .goToUrl(instanceName, 'scripts')
      .multipleItems('Select', 3, optionsMenu, selectedItems)
      .pause(2500)
      .multipleItems('Unselect', 0, optionsMenu, selectedItems);
  },
  'Test Delete multiple Scripts': (client) => {
    const listsPage = client.page.listsPage();
    const selectedItems = listsPage.elements.selectedItem.selector;
    const optionsMenu = listsPage.elements.optionsMenu.selector;

    client
      .pause(2000)
      .multipleItems('Select', 3, optionsMenu, selectedItems)
      .pause(2500);

    listsPage
      .clickListItemDropdown('@optionsMenu', 'Delete')
      .clickElement('@confirmButton')
      .waitForElementVisible('@emptyListItem');
  }
};
