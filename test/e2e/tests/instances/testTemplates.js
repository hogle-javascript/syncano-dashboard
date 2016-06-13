import accounts from '../../tempAccounts';

export default {
  tags: ['templates'],
  after(client) {
    client.end();
  },
  before(client) {
    const loginPage = client.page.loginPage();

    loginPage
      .navigate()
      .setResolution(client)
      .login(accounts.instanceUser.email, accounts.instanceUser.password);
  },
  'Test Select/Deselect multiple Templates': (client) => {
    const listsPage = client.page.listsPage();
    const selectedItems = listsPage.elements.selectedItem.selector;

    client.url('https://localhost:8080/#/instances/' + accounts.instanceUser.instanceName + '/templates');

    listsPage
      // .goToUrl('temp', 'templates')
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
      // .goToUrl('temp', 'templates')
      .clickListItemDropdown('@optionsMenu', 'Select');

    client
      .pause(2000);

    listsPage
      .clickListItemDropdown('@optionsMenu', 'Delete')
      .clickElement('@confirmButton')
      .waitForElementVisible('@emptyListItem');
  }
};
