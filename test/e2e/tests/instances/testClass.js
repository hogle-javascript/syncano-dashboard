import accounts from '../../tempAccounts';
import utils from '../../utils';

export default {
  tags: ['class'],
  before(client) {
    const loginPage = client.page.loginPage();

    loginPage
      .navigate()
      .setResolution(client)
      .login(accounts.alternativeUser.email, accounts.alternativeUser.password);
  },
  after(client) {
    client.end();
  },
  'Test Add Class': (client) => {
    const classesPage = client.page.classesPage();
    const className = utils.addSuffix('class');

    client.url('https://localhost:8080/#/instances/' + accounts.alternativeUser.instanceName + '/classes');

    classesPage
      // Example rewrite tests, will need to change custom command, but right now it is not possible
      // .goToUrl('temp', 'classes')
      .clickElement('@addClassButton')
      .fillInput('@createModalNameInput', className)
      .fillInput('@createModalDescriptionInput', utils.addSuffix())
      .fillInput('@createModalFieldNameInput', 'string')
      .selectDropdownValue('@createModalDropdownType', 'string')
      .clickElement('@addButton')
      .clickElement('@confirmButton')
      .waitForElementNotPresent('@addClassTitle')
      .waitForElementVisible('@classTableRow');

    classesPage.verify.containsText('@classTableRowDescription', utils.addSuffix());
  },
  'Test Edit Class': (client) => {
    const classesPage = client.page.classesPage();
    const edit = utils.addSuffix('edit');

    classesPage
      .clickElement('@classesListItemDropDown')
      .clickElement('@editButton')
      .waitForElementVisible('@createModalDescriptionInput')
      .fillInput('@createModalDescriptionInput', edit)
      .clickElement('@confirmButton')
      .waitForElementVisible('@classTableRowDescription');

    classesPage.verify.containsText('@classTableRowDescription', edit);
  },
  'Test Delete Class': (client) => {
    const classesPage = client.page.classesPage();

    classesPage
      .clickElement('@classesListItemDropDown')
      .clickElement('@deleteButton')
      .waitForElementVisible('@deleteClassModalTitle')
      .clickElement('@confirmDeleteButton')
      .waitForElementNotPresent('@deleteClassModalTitle')
      .waitForElementNotPresent('@classTableName');
  },
  'Test Admin selects/deselects class': (client) => {
    const listsPage = client.page.listsPage();
    const selectedItem = listsPage.elements.selectedItem.selector;
    const optionsMenu = listsPage.elements.firstItemOptionsMenu.selector;

    client.singleItemSelectUnselect('synicon-cloud', optionsMenu, selectedItem);
  },
  'Test Admin cannot delete user_profile class': (client) => {
    const classesPage = client.page.classesPage();

    classesPage.clickElement('@userClassDropDown', client);
    classesPage.waitForElementVisible('@inactiveDeleteButton');

  // assert that Delete Class element is greyed out
    classesPage.assert.attributeContains('@inactiveDeleteButton', 'style', utils.getGreyedOutStyle(client));
  }
};
