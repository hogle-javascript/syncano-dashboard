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
    var classesPage = client.page.classesPage();
    classesPage.navigate();
    classesPage.clickFAB();
    classesPage.selectFromDropdown('@createModalDropdown', '@createModalSchemaString');
    classesPage.clickButton('@addButton');

    classesPage.fillInputField('@createModalNameInput', 'className');
    classesPage.fillInputField('@createModalDescriptionInput', 'nightwatch_test_class_description');

    classesPage.expect.element('@addClassModalTitle').to.be.present.after(5000);
    classesPage.clickButton('@confirmButton');
    classesPage.isModalClosed('@addClassModalTitle');

    classesPage.expect.element('@classesTableRow').to.be.present.after(5000);
    classesPage.expect.element('@classesTableRow').to.contain.text('nightwatch_test_class_description');

  },
  'Test Edit Class' : function(client) {
    var classesPage = client.page.classesPage();
    classesPage.clickSelectClass();
    classesPage.clickButton('@editButton');
    classesPage.fillClassDescription('nightwatch_test_instance_new_description');
    classesPage.clickButton('@confirmButton');
    classesPage.isModalClosed('@editClassModalTitle');

    classesPage.expect.element('@classesTableRowDescription').to.be.present.after(5000);
    classesPage.expect.element('@classesTableRowDescription')
    .to.contain.text('nightwatch_test_class_new_description');
  },
  'Test Delete Class' : function(client) {
    var classesPage = client.page.classesPage();
    classesPage.clickSelectClass();
    classesPage.clickButton('@deleteButton');
    classesPage.clickButton('@confirmDeleteButton');
    classesPage.isModalClosed('@deleteClassModalTitle');

    classesPage.expect.element('@classesTableRowDescription').to.be.present.after(5000);
    classesPage.expect.element('@classesTableRowDescription')
    .to.not.contain.text('nightwatch_test_class_description');
  }
};
