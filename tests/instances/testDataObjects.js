module.exports = {
  tags: ['dataObjects'],
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
  'User goes to Data Objects View' : function(client) {
    var instancesPage = client.page.instancesPage();
    instancesPage.clickButton('@instancesTableRow');
    
    var dataPage = client.page.dataPage();
    dataPage.waitForElementPresent('@dataListItem');
    
    var leftMenuPage = client.page.leftMenuPage();
    leftMenuPage.clickButton('@classes');

    var classesPage = client.page.classesPage();
    classesPage.clickButton('@userClassListItem');

    var dataObjectsPage = client.page.dataObjectsPage();
    dataObjectsPage.waitForElementPresent('@dataObjectsTableBody');
  }
};