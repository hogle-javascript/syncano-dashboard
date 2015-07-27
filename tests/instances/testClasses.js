module.exports = {
  tags: ['instances'],
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
  'Test Add Instance' : function(client) {
    var classesPage = client.page.classesPage();
    classesPage.navigate();
    instancesPage.clickFAB();
    instancesPage.fillInstanceName();
    instancesPage.fillInstanceDescription('nightwatch_test_instance_description');
    instancesPage.expect.element('@addInstanceModalTitle').to.be.present.after(5000);
    instancesPage.clickButton('@confirmButton');
    instancesPage.isModalClosed('@addInstanceModalTitle');

    instancesPage.expect.element('@instancesTableRow').to.be.present.after(5000);
    instancesPage.expect.element('@instancesTableRow').to.contain.text('nightwatch_test_instance_description');

  },
  'Test Edit Instance' : function(client) {
    var instancesPage = client.page.instancesPage();
    instancesPage.clickSelectInstance();
    instancesPage.clickButton('@editButton');
    instancesPage.fillInstanceDescription('nightwatch_test_instance_new_description');
    instancesPage.clickButton('@confirmButton');
    instancesPage.isModalClosed('@editInstanceModalTitle');

    instancesPage.expect.element('@instancesTableRowDescription').to.be.present.after(5000);
    instancesPage.expect.element('@instancesTableRowDescription')
    .to.contain.text('nightwatch_test_instance_new_description');
  },
  'Test Delete Instance' : function(client) {
    var instancesPage = client.page.instancesPage();
    instancesPage.clickSelectInstance();
    instancesPage.clickButton('@deleteButton');
    instancesPage.clickButton('@confirmDeleteButton');
    instancesPage.isModalClosed('@deleteInstanceModalTitle');

    instancesPage.expect.element('@instancesTableRowDescription').to.be.present.after(5000);
    instancesPage.expect.element('@instancesTableRowDescription')
    .to.not.contain.text('nightwatch_test_instance_description');
  }
};
