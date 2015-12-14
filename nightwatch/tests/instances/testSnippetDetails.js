module.exports = {
  tags: ['snippets'],
  before(client) {
    const loginPage = client.page.loginPage();

    loginPage
      .navigate()
      .login(process.env.NIGHTWATCH_EMAIL, process.env.NIGHTWATCH_PASSWORD);
  },
  after(client) {
    client.end();
  },
  'User goes to Snippet edit view': (client) => {
    //var instancesPage = client.page.instancesPage();
    //instancesPage.clickButton('@instancesTableName');
    
    var socketsPage = client.page.socketsPage();
    socketsPage.waitForElementPresent('@codeBoxSocketItem');

    var leftMenuPage = client.page.leftMenuPage();
    leftMenuPage.clickButton('@snippets');

    var snippetsPage = client.page.snippetsPage();
    snippetsPage.clickButton('@snippetListItem');

    var snippetEditPage = client.page.snippetEditPage();
    snippetEditPage.waitForElementPresent('@snippetEditView');
  },
  'User goes to Snippet config view': (client) => {
    var instancesPage = client.page.instancesPage();
    client.url(instancesPage.url);
    instancesPage.clickButton('@instancesTableName');
    
    var socketsPage = client.page.socketsPage();
    socketsPage.waitForElementPresent('@codeBoxSocketItem');

    var leftMenuPage = client.page.leftMenuPage();
    leftMenuPage.clickButton('@snippets');

    var snippetsPage = client.page.snippetsPage();
    snippetsPage.clickButton('@snippetListItem');

    var snippetEditPage = client.page.snippetEditPage();
    snippetEditPage.clickButton('@config');

    snippetEditPage.waitForElementPresent('@configKeyField');
    snippetEditPage.waitForElementPresent('@configValueField');
    snippetEditPage.waitForElementPresent('@configAddFieldButton');
    snippetEditPage.verify.containsText('@configKeyField', '');
    snippetEditPage.verify.containsText('@configValueField', '');

  },
  'User goes to Snippet traces view': (client) => {
    var instancesPage = client.page.instancesPage();
    client.url(instancesPage.url);
    instancesPage.clickButton('@instancesTableName');
    
    var socketsPage = client.page.socketsPage();
    socketsPage.waitForElementPresent('@codeBoxSocketItem');
    
    var leftMenuPage = client.page.leftMenuPage();
    leftMenuPage.clickButton('@snippets');

    var snippetsPage = client.page.snippetsPage();
    snippetsPage.clickButton('@snippetListItem');

    var snippetEditPage = client.page.snippetEditPage();
    snippetEditPage.clickButton('@traces');

    snippetEditPage.waitForElementPresent('@tracesEmpty');
  }
};