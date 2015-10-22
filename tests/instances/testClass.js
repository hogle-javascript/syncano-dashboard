import utils from '../utils';

export default {
  tags: ['class'],
  before(client) {
    const loginPage = client.page.loginPage();

    loginPage
      .navigate()
      .typeEmail()
      .typePassword()
      .clickSignInButton()
      .verifyLoginSuccessful()
  },
  after(client) {
    client.end();
  },
  'Test Add Class': (client) => {
    const className = utils.addSuffix('class');
    const classesPage = client.page.classesPage();

    classesPage
      .navigate()
      .clickButton('@fab')
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

    classesPage
      .clickDropdown()
      .clickButton('@editDropdownItem')
      .waitForElementVisible('@createModalDescriptionInput')
      .fillInputField('@createModalDescriptionInput', 'nightwatch_test_class_new_description')
      .clickButton('@confirmButton')
      .waitForElementNotVisible('@editClassTitle');
    client.pause(1000);
    classesPage
      .waitForElementVisible('@classTableRowDescription')
      .verify.containsText('@classTableRowDescription', 'nightwatch_test_class_new_description');
  },
  'Test Delete Class': (client) => {
    const classesPage = client.page.classesPage();

    classesPage
      .clickDropdown()
      .clickButton('@deleteDropdownItem');
    client.pause(1000);
    classesPage
      .waitForElementVisible('@deleteClassModalTitle')
      .clickButton('@confirmDeleteButton')
      .waitForElementNotVisible('@deleteClassModalTitle')
      .waitForElementNotPresent('@classTableName');
  },
  'Test Admin cannot delete user_profile class': (client) => {
    const classesPage = client.page.classesPage();

    classesPage
      .clickButton('@selectUserClass')
      .waitForElementVisible('@inactiveDeleteButton')
      .clickButton('@checkboxSelected');
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
