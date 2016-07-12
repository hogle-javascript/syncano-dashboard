import accounts from '../../tempAccounts';
import utils, { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['template'],
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
  'Test Add Template': (client) => {
    const listsPage = client.page.listsPage();
    const templateName = utils.addSuffix('template');
    const { instanceName } = accounts.instanceUser;

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
});
