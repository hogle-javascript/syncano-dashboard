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

    classesPage
      .navigate()
      .clickElement('@addClassButton')
      .fillInput('@createModalNameInput', 'class')
      .fillInput('@createModalDescriptionInput')
      .fillInput('@createModalFieldNameInput', 'string');
    classesPage.selectFromDropdown('@createModalDropdownType', '@createModalSchemaString', client);
    classesPage.clickElement('@addButton')
      .waitForElementVisible('@addClassTitle')
      .clickElement('@confirmButton')
      .waitForElementNotPresent('@addClassTitle')
      .waitForElementVisible('@classTableRow');

    classesPage.verify.containsText('@classTableRowDescription', Utils.addSuffix());
  },
  'Test Edit Class': (client) => {
    const classesPage = client.page.classesPage();

    classesPage
      .clickDropdown('@classItemDropdown', client);
    classesPage.clickElement('@editDropdownItem')
      .waitForElementVisible('@createModalDescriptionInput')
      .fillInput('@createModalDescriptionInput', 'edit')
      .clickElement('@confirmButton')
      .waitForElementVisible('@classTableRowDescription');

    classesPage.verify.containsText('@classTableRowDescription', Utils.addSuffix('edit'));
  },
  'Test Delete Class': (client) => {
    const classesPage = client.page.classesPage();

    classesPage
      .clickDropdown('@classItemDropdown', client);
    classesPage.clickElement('@deleteDropdownItem')
      .waitForElementVisible('@deleteClassModalTitle')
      .clickElement('@confirmDeleteButton')
      .waitForElementNotPresent('@deleteClassModalTitle')
      .waitForElementNotPresent('@classTableName');
  },
  'Test Admin selects/deselects class': (client) => {
    const classesPage = client.page.classesPage();

    classesPage
      .moveToElement('@selectUserClass', 0, 0)
      .clickElement('@classToSelect')
      .clickElement('@checkboxSelected')
      .waitForElementVisible('@classToSelect');
  },
  'Test Admin cannot delete user_profile class': (client) => {
    const classesPage = client.page.classesPage();

    classesPage.clickDropdown('@userClassDropDown', client);
    classesPage.waitForElementVisible('@inactiveDeleteButton');

  // assert that Delete Class element is greyed out
    classesPage.assert.attributeContains('@inactiveDeleteButton', 'style', 'color: rgba(0, 0, 0, 0.298039)');
  }
};
