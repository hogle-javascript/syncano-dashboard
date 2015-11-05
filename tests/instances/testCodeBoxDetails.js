module.exports = {
  tags: ['codeBoxes'],
  before: function(client) {
    var loginPage = client.page.loginPage();
    loginPage.navigate();
    loginPage.typeEmail();
    loginPage.typePassword();
    loginPage.clickSignInButton();
    loginPage.verifyLoginSuccessful();

  },
  after: function(client) {
    client.end();
  },
  'User goes to CodeBox edit view' : function(client) {
    var instancesPage = client.page.instancesPage();
    instancesPage.clickButton('@instancesTableRow');
    
    var dataPage = client.page.dataPage();
    dataPage.waitForElementPresent('@webhookListItem');

    var leftMenuPage = client.page.leftMenuPage();
    leftMenuPage.clickButton('@codeBoxes');

    var codeBoxesPage = client.page.codeBoxesPage();
    codeBoxesPage.clickButton('@codeBoxListItem');

    var codeBoxEditPage = client.page.codeBoxEditPage();
    codeBoxEditPage.waitForElementPresent('@codeBoxEditView');
  },
  'User goes to CodeBox config view' : function(client) {
    var instancesPage = client.page.instancesPage();
    client.url(instancesPage.url);
    instancesPage.clickButton('@instancesTableRow');
    
    var dataPage = client.page.dataPage();
    dataPage.waitForElementPresent('@webhookListItem');

    var leftMenuPage = client.page.leftMenuPage();
    leftMenuPage.clickButton('@codeBoxes');

    var codeBoxesPage = client.page.codeBoxesPage();
    codeBoxesPage.clickButton('@codeBoxListItem');

    var codeBoxEditPage = client.page.codeBoxEditPage();
    codeBoxEditPage.clickButton('@config');

    codeBoxEditPage.waitForElementPresent('@configKeyField');
    codeBoxEditPage.waitForElementPresent('@configValueField');
    codeBoxEditPage.waitForElementPresent('@configAddFieldButton');
    codeBoxEditPage.verify.containsText('@configKeyField', '');
    codeBoxEditPage.verify.containsText('@configValueField', '');

  },
  'User goes to CodeBox traces view' : function(client) {
    var instancesPage = client.page.instancesPage();
    client.url(instancesPage.url);
    instancesPage.clickButton('@instancesTableRow');
    
    var dataPage = client.page.dataPage();
    dataPage.waitForElementPresent('@webhookListItem');
    
    var leftMenuPage = client.page.leftMenuPage();
    leftMenuPage.clickButton('@codeBoxes');

    var codeBoxesPage = client.page.codeBoxesPage();
    codeBoxesPage.clickButton('@codeBoxListItem');

    var codeBoxEditPage = client.page.codeBoxEditPage();
    codeBoxEditPage.clickButton('@traces');

    codeBoxEditPage.waitForElementPresent('@tracesEmpty');
  }
};