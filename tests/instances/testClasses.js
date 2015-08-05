module.exports = {
  tags: ['classes'],
  before: function(client) {
    var loginPage = client.page.loginPage();
    loginPage.goToLoginPage();
    loginPage.typeEmail();
    loginPage.typePassword();
    loginPage.clickSignInButton();
    loginPage.verifyLoginSuccessful();

  },
  after: function(client) {
    client.end();
  },
  'Test Add Class' : function(client) {
    var className = 'a' + Date.now();
    client.globals.className = className;
    var classesPage = client.page.classesPage();
    classesPage.navigate();
    classesPage.clickFAB();

    classesPage.fillInputField('@createModalNameInput', className);
    classesPage.fillInputField('@createModalDescriptionInput', 'nightwatch_test_class_description');
    classesPage.fillInputField('@createModalFieldNameInput', 'schemaName');
    classesPage.selectFromDropdown('@createModalDropdownType', '@createModalSchemaString');
    classesPage.clickButton('@addButton');
    client.pause(1000);
    classesPage.verify.elementPresent('@addClassTitle');
    classesPage.clickButton('@confirmButton');
    classesPage.isModalClosed('@addClassTitle');

    classesPage.verify.elementPresent('@classTableRow');
    classesPage.verify.containsText('@classTableRow', 'nightwatch_test_class_description');
  },
  'Test Edit Class' : function(client) {
    var classesPage = client.page.classesPage();
    classesPage.clickSelectClass();
    classesPage.clickButton('@editButton');
    classesPage.fillClassDescription('nightwatch_test_class_new_description');
    classesPage.clickButton('@confirmButton');
    classesPage.isModalClosed('@editClassTitle');
    client.pause(1000);
    classesPage.verify.elementPresent('@classTableRowDescription');
    classesPage.verify.containsText('@classTableRowDescription', 'nightwatch_test_class_new_description');
  },
  'Test Delete Class' : function(client) {
    var classesPage = client.page.classesPage();
    classesPage.clickSelectClass();
    classesPage.clickButton('@deleteButton');
    client.pause(1000);
    classesPage.clickButton('@confirmDeleteButton');
    classesPage.isModalClosed('@deleteClassModalTitle');
    classesPage.verify.elementNotPresent('@deleteClassModalTitle');

    classesPage.verify.elementPresent('@classTableName');
    classesPage.expect.element('@classTableName').to.not.contain.text(client.globals.className);
  }
};
