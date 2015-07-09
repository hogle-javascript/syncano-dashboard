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
    var instancesPage = client.page.instancesPage();
    instancesPage.clickFAB();
    instancesPage.fillInstanceName();
    instancesPage.fillInstanceDescription();
    instancesPage.clickConfirmButton();

    instancesPage.expect.element('@instancesTableFirstInstanceName').to.be.present.after(5000);
    instancesPage.expect.element('@instancesTableFirstInstanceName').to.contain.text('nightwatch_test_instance');
  },

};
