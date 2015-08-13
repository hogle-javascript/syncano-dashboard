module.exports = {
  tags: ['navigation'],
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
  beforeEach: function(client) {
    var topNavigationPage = client.page.topNavigationPage();
    topNavigationPage.clickButton('@syncanoLogo');

    var instancesPage = client.page.instancesPage();
    instancesPage.clickButton('@instancesTableRow');

    var dataPage = client.page.dataPage();
    dataPage.waitForElementPresent('@dataListItem');
  },
  'User goes to Administrators View' : function(client) {
    var leftMenuPage = client.page.leftMenuPage();
    leftMenuPage.clickButton('@administrators');

    var administratorsPage = client.page.administratorsPage();
    administratorsPage.waitForElementPresent('@administratorsListItem');
  },
  'User goes to API Keys View' : function(client) {   
    var leftMenuPage = client.page.leftMenuPage();
    leftMenuPage.clickButton('@apiKeys');

    var apiKeysPage = client.page.apiKeysPage();
    apiKeysPage.expect.element('@addApiKeyButton').to.be.present.after(5000);
  },
  'User goes to Channels View' : function(client) {
    var leftMenuPage = client.page.leftMenuPage();
    leftMenuPage.clickButton('@channels');

    var channelsPage = client.page.channelsPage();
    channelsPage.waitForElementPresent('@channelListItem');
  },
    'User goes to Classes View' : function(client) {  
    var leftMenuPage = client.page.leftMenuPage();
    leftMenuPage.clickButton('@classes');

    var classesPage = client.page.classesPage();
    classesPage.waitForElementPresent('@classTableRow');
  },
    'User goes to CodeBox edit view' : function(client) {
    var leftMenuPage = client.page.leftMenuPage();
    leftMenuPage.clickButton('@codeBoxes');

    var codeBoxesPage = client.page.codeBoxesPage();
    codeBoxesPage.clickButton('@codeBoxListItem');

    var codeBoxEditPage = client.page.codeBoxEditPage();
    codeBoxEditPage.waitForElementPresent('@codeBoxEditView');
  },
  'User goes to CodeBox config view' : function(client) {
    var leftMenuPage = client.page.leftMenuPage();
    leftMenuPage.clickButton('@codeBoxes');

    var codeBoxesPage = client.page.codeBoxesPage();
    codeBoxesPage.clickButton('@codeBoxListItem');

    var codeBoxEditPage = client.page.codeBoxEditPage();
    codeBoxEditPage.clickButton('@config');

    codeBoxEditPage.waitForElementPresent('@configEmpty');
    codeBoxEditPage.verify.containsText('@configEmpty', '{');

  },
  'User goes to CodeBox traces view' : function(client) {
    var leftMenuPage = client.page.leftMenuPage();
    leftMenuPage.clickButton('@codeBoxes');

    var codeBoxesPage = client.page.codeBoxesPage();
    codeBoxesPage.clickButton('@codeBoxListItem');

    var codeBoxEditPage = client.page.codeBoxEditPage();
    codeBoxEditPage.clickButton('@traces');

    codeBoxEditPage.waitForElementPresent('@tracesEmpty');
  },
  'User goes to Data Objects View' : function(client) {
    var leftMenuPage = client.page.leftMenuPage();
    leftMenuPage.clickButton('@classes');

    var classesPage = client.page.classesPage();
    classesPage.clickButton('@userClassListItem');

    var dataObjectsPage = client.page.dataObjectsPage();
    dataObjectsPage.waitForElementPresent('@dataObjectsTableBody');
  },
  'User goes to Data View' : function(client) {
    var dataPage = client.page.dataPage();
    dataPage.waitForElementPresent('@dataListItem');

    dataPage.expect.element('@instancesDropdown').to.be.present.after(5000);
    dataPage.expect.element('@instancesDropdown').to.contain.text('enter_this_instance_now');
  },
  'User goes to Tasks View' : function(client) {
    var leftMenuPage = client.page.leftMenuPage();
    leftMenuPage.clickButton('@tasks');

    var tasksPage = client.page.tasksPage();
    tasksPage.waitForElementPresent('@scheduleListItem');
  },
  'User goes to Users View' : function(client) {
    var leftMenuPage = client.page.leftMenuPage();
    leftMenuPage.clickButton('@users');

    var usersPage = client.page.usersPage();
    usersPage.waitForElementPresent('@user');
  },
  'User goes to Webhook Traces View' : function(client) {
    var dataPage = client.page.dataPage();
    dataPage.clickButton('@webhookListItem');

    var webhookTracesPage = client.page.webhookTracesPage();
    webhookTracesPage.waitForElementPresent('@webhookTracesEmptyView');
  },
  'User goes to Solutions View' : function(client) {
    var topNavigationPage = client.page.topNavigationPage();
    topNavigationPage.clickButton('@solutions');

    var solutionsPage = client.page.solutionsPage();
    solutionsPage.waitForElementPresent('@solutionsView');
  },
  'User goes to Solution Details View' : function(client) {
    var topNavigationPage = client.page.topNavigationPage();
    topNavigationPage.clickButton('@solutions');

    var solutionsPage = client.page.solutionsPage();
    solutionsPage.waitForElementPresent('@solutionsView');
    solutionsPage.clickButton('@solutionDetails');

    var solutionDetailsPage = client.page.solutionDetailsPage();
    solutionDetailsPage.waitForElementPresent('@installSolutionButton');
  },
};