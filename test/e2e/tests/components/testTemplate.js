import accounts from '../../tempAccounts';
import utils from '../../utils';

export default {
  tags: ['template'],
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
  'Test Add Template': (client) => {
    const listsPage = client.page.listsPage();
    const templateName = utils.addSuffix('template');
    const instanceName = accounts.instanceUser.instanceName;

    listsPage
      .goToUrl(instanceName, 'templates')
      .clickElement('@addButton')
      .fillInput('@inputName', templateName)
      .fillInput('@inputContentType', 'text/csv')
      .clickElement('@confirmButton')
      .waitForElementNotPresent('@addTitleHeading')
      .verify.containsText('@firstItemRowName', templateName);
  },
  'Test Edit Template': (client) => {
    const listsPage = client.page.listsPage();

    listsPage
      .waitForElementVisible('@firstItemOptionsMenu')
      .clickListItemDropdown('@firstItemOptionsMenu', 'Edit')
      .fillInput('@inputContentType', 'text/html')
      .clickElement('@confirmButton')
      .waitForElementVisible('@firstItemRowDescription')
      .verify.containsText('@firstItemRowDescription', 'text/html');
  },
  'Test Delete Template': (client) => {
    const listsPage = client.page.listsPage();

    listsPage
      .clickListItemDropdown('@firstItemOptionsMenu', 'Delete')
      .clickElement('@confirmButton')
      .waitForElementNotPresent('@deleteTitleHeading')
      .verify.containsText('@firstItemRowName', 'objects_csv');
  },
  'Test Admin Selects/Deselects Template': (client) => {
    const listsPage = client.page.listsPage();
    const selectedItem = listsPage.elements.selectedItem.selector;
    const optionsMenu = listsPage.elements.firstItemOptionsMenu.selector;

    client
      .singleItemSelectUnselect('synicon-arrow-up-bold', optionsMenu, selectedItem);
  }
};
