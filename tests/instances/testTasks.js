module.exports = {
  tags: ['tasks'],
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
  'User goes to Tasks View' : function(client) {
    var instancesPage = client.page.instancesPage();
    instancesPage.clickButton('@instancesTableRow');
    
    var dataPage = client.page.dataPage();
    dataPage.waitForElementPresent('@dataListItem');
    
    var leftMenuPage = client.page.leftMenuPage();
    leftMenuPage.clickButton('@tasks');

    var tasksPage = client.page.tasksPage();
    tasksPage.waitForElementPresent('@scheduleListItem');
  }
};