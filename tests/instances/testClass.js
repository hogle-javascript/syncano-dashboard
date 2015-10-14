const utils = require('../utils');

module.exports = {
  tags: ['class'],
  before(client) {
    const loginPage = client.page.loginPage();

    loginPage.navigate();
    loginPage.typeEmail();
    loginPage.typePassword();
    loginPage.clickSignInButton();
    loginPage.verifyLoginSuccessful();
  },
  after(client) {
    client.end();
  },
  'Test Add Class': function addClass(client) {
    const className = utils.addSuffix('class');
    const classesPage = client.page.classesPage();

    classesPage.navigate();
    classesPage.clickButton('@fab');
    classesPage.fillInputField('@createModalNameInput', className);
    classesPage.fillInputField('@createModalDescriptionInput', 'nightwatch_test_class_description');
    classesPage.fillInputField('@createModalFieldNameInput', 'schemaName');
    classesPage.selectFromDropdown('@createModalDropdownType', '@createModalSchemaString');
    classesPage.clickButton('@addButton');
    client.pause(1000);
    classesPage.waitForElementVisible('@addClassTitle');
    classesPage.clickButton('@confirmButton');
    classesPage.waitForElementNotVisible('@addClassTitle');

    classesPage.waitForElementVisible('@classTableRow');
    classesPage.verify.containsText('@classTableRowDescription', 'nightwatch_test_class_description');
  },
  'Test Edit Class': function editClass(client) {
    const classesPage = client.page.classesPage();

    classesPage.clickButton('@selectClass');
    classesPage.clickButton('@editButton');
    classesPage.fillInputField('@createModalDescriptionInput', 'nightwatch_test_class_new_description');
    classesPage.clickButton('@confirmButton');
    classesPage.waitForElementNotVisible('@editClassTitle');
    client.pause(1000);
    classesPage.waitForElementVisible('@classTableRowDescription');
    classesPage.verify.containsText('@classTableRowDescription', 'nightwatch_test_class_new_description');
  },
  'Test Delete Class': function deleteClass(client) {
    const classesPage = client.page.classesPage();

    classesPage.clickButton('@selectClass');
    classesPage.clickButton('@deleteButton');
    client.pause(1000);
    classesPage.clickButton('@confirmDeleteButton');
    classesPage.waitForElementNotVisible('@deleteClassModalTitle');
    classesPage.waitForElementNotPresent('@classTableName');
  },
  'Test Admin cannot delete user_profile class': function cantDeleteUserClass(client) {
    const classesPage = client.page.classesPage();

    classesPage.navigate();
    classesPage.clickButton('@selectUserClass');
    classesPage.waitForElementVisible('@inactiveDeleteButton');
  },
  'Test Admin selects/deselects class': function cantDeleteUserClass(client) {
    const classesPage = client.page.classesPage();

    classesPage.navigate();
    classesPage.clickButton('@selectUserClass');
    classesPage.clickButton('@checkboxSelected');
    classesPage.waitForElementVisible('@selectUserClass');
  }
};
