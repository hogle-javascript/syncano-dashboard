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
    
    var socketsPage = client.page.socketsPage();
    socketsPage.waitForElementPresent('@codeBoxSocketItem');

    var leftMenuPage = client.page.leftMenuPage();
    leftMenuPage.clickButton('@codeBoxes');

    var snippetsPage = client.page.snippetsPage();
    snippetsPage.clickButton('@codeBoxListItem');

    var snippetEditPage = client.page.snippetEditPage();
    snippetEditPage.waitForElementPresent('@codeBoxEditView');
  },
  'User goes to CodeBox config view' : function(client) {
    var instancesPage = client.page.instancesPage();
    client.url(instancesPage.url);
    instancesPage.clickButton('@instancesTableRow');
    
    var socketsPage = client.page.socketsPage();
    socketsPage.waitForElementPresent('@codeBoxSocketItem');

    var leftMenuPage = client.page.leftMenuPage();
    leftMenuPage.clickButton('@codeBoxes');

    var snippetsPage = client.page.snippetsPage();
    snippetsPage.clickButton('@codeBoxListItem');

    var snippetEditPage = client.page.snippetEditPage();
    snippetEditPage.clickButton('@config');

    snippetEditPage.waitForElementPresent('@configKeyField');
    snippetEditPage.waitForElementPresent('@configValueField');
    snippetEditPage.waitForElementPresent('@configAddFieldButton');
    snippetEditPage.verify.containsText('@configKeyField', '');
    snippetEditPage.verify.containsText('@configValueField', '');

  },
  'User goes to CodeBox traces view' : function(client) {
    var instancesPage = client.page.instancesPage();
    client.url(instancesPage.url);
    instancesPage.clickButton('@instancesTableRow');
    
    var socketsPage = client.page.socketsPage();
    socketsPage.waitForElementPresent('@codeBoxSocketItem');
    
    var leftMenuPage = client.page.leftMenuPage();
    leftMenuPage.clickButton('@codeBoxes');

    var snippetsPage = client.page.snippetsPage();
    snippetsPage.clickButton('@codeBoxListItem');

    var snippetEditPage = client.page.snippetEditPage();
    snippetEditPage.clickButton('@traces');

    snippetEditPage.waitForElementPresent('@tracesEmpty');
  }
};