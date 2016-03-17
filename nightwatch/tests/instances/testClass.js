import Utils from '../../utils';

export default {
  tags: ['class'],
  before(client) {
    const loginPage = client.page.loginPage();

    loginPage
      .navigate()
      .login(process.env.NIGHTWATCH_EMAIL, process.env.NIGHTWATCH_PASSWORD);
  },
  after(client) {
    client.end();
  },
  'Test Add Class': (client) => {
    const classesPage = client.page.classesPage();
    const className = Utils.addSuffix('class');

    classesPage
      .navigate()
      .clickElement('@addClassButton')
      .waitForElementVisible('@addClassTitle')
      .fillInput('@createModalNameInput', className)
      .fillInput('@createModalDescriptionInput', Utils.addSuffix())
      .fillInput('@createModalFieldNameInput', 'string')
      .selectDropdownValue('@createModalDropdownType', 'string')
      .clickElement('@addButton')
      .clickElement('@confirmButton')
      .waitForElementNotPresent('@addClassTitle')
      .waitForElementVisible('@classTableRow');

    classesPage.verify.containsText('@classTableRowDescription', Utils.addSuffix());
  },
  'Test Edit Class': (client) => {
    const classesPage = client.page.classesPage();
    const edit = Utils.addSuffix('edit');
    const className = Utils.addSuffix('class');

    classesPage
      .navigate()
      .clickListItemDropdown(className, 'Edit')
      .waitForElementVisible('@createModalDescriptionInput')
      .fillInput('@createModalDescriptionInput', edit)
      .clickElement('@confirmButton')
      .waitForElementVisible('@classTableRowDescription');

    classesPage.verify.containsText('@classTableRowDescription', edit);
  },
  'Test Delete Class': (client) => {
    const classesPage = client.page.classesPage();
    const className = Utils.addSuffix('class');

    classesPage
      .clickListItemDropdown(className, 'Delete')
      .waitForElementVisible('@deleteClassModalTitle')
      .clickElement('@confirmDeleteButton')
      .waitForElementNotPresent('@deleteClassModalTitle')
      .waitForElementNotPresent('@classTableName');
  },
  'Test Admin selects/deselects class': (client) => {
    const classesPage = client.page.classesPage();

    classesPage
      .navigate()
      .waitForElementVisible('@selectUserClass')
      .moveToElement('@selectUserClass', 0, 0)
      .clickElement('@classToSelect')
      .clickElement('@checkboxSelected')
      .waitForElementVisible('@classToSelect');
  },
  'Test Admin cannot delete user_profile class': (client) => {
    const classesPage = client.page.classesPage();

    classesPage.clickElement('@userClassDropDown', client);
    classesPage.waitForElementVisible('@inactiveDeleteButton');

  // assert that Delete Class element is greyed out
    classesPage.assert.attributeContains('@inactiveDeleteButton', 'style', 'color: rgba(0, 0, 0, 0.298039)');
  }
};
