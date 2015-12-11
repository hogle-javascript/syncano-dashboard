import utils from '../../utils';

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
    const className = utils.addSuffix('class');
    const classesPage = client.page.classesPage();

    classesPage
      .navigate()
      .clickButton('@addClassButton')
      .fillInputField('@createModalNameInput', className)
      .fillInputField('@createModalDescriptionInput', 'nightwatch_test_class_description')
      .fillInputField('@createModalFieldNameInput', 'schemaName')
      .selectFromDropdown('@createModalDropdownType', '@createModalSchemaString')
      .clickButton('@addButton');
    client.pause(1000);
    classesPage
      .waitForElementVisible('@addClassTitle')
      .clickButton('@confirmButton')
      .waitForElementNotVisible('@addClassTitle')
      .waitForElementVisible('@classTableRow')
      .verify.containsText('@classTableRowDescription', 'nightwatch_test_class_description');
  },
  'Test Edit Class': (client) => {
    const classesPage = client.page.classesPage();

    classesPage.clickDropdown('@classItemDropdown');
    client.pause(1000);
    classesPage.clickButton('@editDropdownItem')
      .waitForElementNotVisible('@editDropdownItem')
      .waitForElementVisible('@createModalDescriptionInput')
      .fillInputField('@createModalDescriptionInput', 'nightwatch_test_class_new_description')
      .clickButton('@confirmButton');
    client.pause(1000);
    classesPage
      .waitForElementVisible('@classTableRowDescription')
      .verify.containsText('@classTableRowDescription', 'nightwatch_test_class_new_description');
  },
  'Test Delete Class': (client) => {
    const classesPage = client.page.classesPage();

    classesPage
      .clickDropdown('@classItemDropdown');
    client.pause(1000);
    classesPage.clickButton('@deleteDropdownItem');
    client.pause(1000);
    classesPage
      .waitForElementVisible('@deleteClassModalTitle')
      .clickButton('@confirmDeleteButton');
    client.pause(1000);
    classesPage
      .waitForElementNotVisible('@deleteClassModalTitle')
      .waitForElementNotPresent('@classTableName');
  },
  'Test Admin cannot delete user_profile class': (client) => {
    const classesPage = client.page.classesPage();

    classesPage
      .clickDropdown('@userClassDropDown')
      .waitForElementVisible('@inactiveDeleteButton');

  // assert that Delete Class element is greyed out
    classesPage.assert.attributeContains('@inactiveDeleteButton', 'style', 'color: rgba(0, 0, 0, 0.298039)');
  },
  'Test Admin selects/deselects class': (client) => {
    const classesPage = client.page.classesPage();

    classesPage
      .moveToElement('@selectUserClass', 0, 0)
      .clickButton('@classToSelect')
      .clickButton('@checkboxSelected')
      .waitForElementVisible('@classToSelect');
  }
};
