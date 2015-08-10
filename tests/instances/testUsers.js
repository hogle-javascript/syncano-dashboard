module.exports = {
  tags: ['users'],
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
  'User goes to Users View' : function(client) {
    var instancesPage = client.page.instancesPage();
    instancesPage.clickButton('@instancesTableRow');
    
    var dataPage = client.page.dataPage();
    dataPage.waitForElementPresent('@dataListItem');

    var leftMenuPage = client.page.leftMenuPage();
    leftMenuPage.clickButton('@users');

    var usersPage = client.page.usersPage();
    usersPage.waitForElementPresent('@user');
  }
};