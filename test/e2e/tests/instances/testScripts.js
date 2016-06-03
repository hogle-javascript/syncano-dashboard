import Globals from '../../globals';
import Async from 'async';

export default {
  tags: ['snippets'],
  before(client) {
    Async.waterfall([
      client.createTempAccount,
      client.createTempScript,
      client.createTempScript,
      client.createTempScript
    ], (err) => {
      if (err) throw err;
      const loginPage = client.page.loginPage();

      loginPage
        .navigate()
        .setResolution(client)
        .login(Globals.tempEmail, Globals.tempPass);
    });
  },
  after(client) {
    client.end();
  },
  'Test Select/Deselect multiple Scripts': (client) => {
    const listsPage = client.page.listsPage();
    const selectedItems = listsPage.elements.selectedItem.selector;
    const optionsMenu = listsPage.elements.optionsMenu.selector;

    client
      .goToUrl('temp', 'scripts')
      .multipleItems('Select', 3, optionsMenu, selectedItems)
      .pause(2500)
      .multipleItems('Unselect', 0, optionsMenu, selectedItems);
  },
  'Test Delete multiple Scripts': (client) => {
    const listsPage = client.page.listsPage();
    const selectedItems = listsPage.elements.selectedItem.selector;
    const optionsMenu = listsPage.elements.optionsMenu.selector;

    client
      .goToUrl('temp', 'scripts')
      .pause(2000)
      .multipleItems('Select', 3, optionsMenu, selectedItems)
      .pause(2500);

    listsPage
      .clickListItemDropdown('@optionsMenu', 'Delete')
      .clickElement('@confirmButton')
      .waitForElementVisible('@emptyListItem');
  }
};
