module.exports = {
  tags: ['administrators'],
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
  'User goes to Administrators View' : function(client) {
    var instancesPage = client.page.instancesPage();
    instancesPage.clickButton('@instancesTableRow');
    
    var leftMenuPage = client.page.leftMenuPage();
    leftMenuPage.clickButton('@administrators');

    var administratorsPage = client.page.administratorsPage();
    administratorsPage.waitForElementPresent('@administratorsListItem');
  }
};