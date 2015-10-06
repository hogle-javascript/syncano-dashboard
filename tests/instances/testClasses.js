const utils = require('../utils');

module.exports = {
  tags: ['classes'],
  before: function(client) {
    const loginPage = client.page.loginPage();

    loginPage.navigate();
    loginPage.typeEmail();
    loginPage.typePassword();
    loginPage.clickSignInButton();
    loginPage.verifyLoginSuccessful();
  },
  after: function(client) {
    client.end();
  },
  'Test Add Class' : function(client) {
    const className = utils.addSuffix('class');
    const classesPage = client.page.classesPage();

    classesPage.navigate();
    classesPage.clickFAB();
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
  'Test Edit Class' : function(client) {
    const classesPage = client.page.classesPage();

    classesPage.navigate();
    classesPage.clickDropdown();
    classesPage.clickButton('@editDropdownItem');
    classesPage.fillClassDescription('nightwatch_test_class_new_description');
    classesPage.clickButton('@confirmButton');
    classesPage.waitForElementNotVisible('@editClassTitle');
    client.pause(1000);
    classesPage.waitForElementVisible('@classTableRowDescription');
    classesPage.verify.containsText('@classTableRowDescription', 'nightwatch_test_class_new_description');
  },
  'Test Delete Class' : function(client) {
    const classesPage = client.page.classesPage();

    classesPage.clickSelectClass();
    classesPage.clickButton('@deleteButton');
    client.pause(1000);
    classesPage.clickButton('@confirmDeleteButton');
    classesPage.waitForElementNotVisible('@deleteClassModalTitle');
    classesPage.waitForElementNotPresent('@classTableName');
  }
};
