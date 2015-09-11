const path = require('path');


module.exports = {
  tags: ['navigation'],
  before: function(client) {
    const loginPage = client.page.loginPage();

    console.log('Starting tests');
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
    const instancesPage = client.page.instancesPage();
    const dataPage = client.page.dataPage();

    instancesPage.navigate();
    instancesPage.clickButton('@instancesTableRow');
    dataPage.waitForElementPresent('@webhookListItem');
  },

  afterEach: function(client, done) {
    if (!process.env.CI || process.env.CIRCLE_BRANCH !== 'master') {
      done();
      return;
    }

    const prefix = client.currentTest.name.replace(/\s/g, '-').replace(/"|'/g, '');
    const fileNamePath = path.resolve(path.join(client.options.screenshotsPath, '_navigation', prefix + '.png'))

    client.saveScreenshot(fileNamePath, done);
  },

  'User goes to Administrators View' : function(client) {
    const leftMenuPage = client.page.leftMenuPage();
    const adminsPage = client.page.adminsPage();

    leftMenuPage.clickButton('@administrators');
    adminsPage.waitForElementPresent('@adminsListItem');
  },
  'User goes to API Keys View' : function(client) {
    const leftMenuPage = client.page.leftMenuPage();
    const apiKeysPage = client.page.apiKeysPage();

    leftMenuPage.clickButton('@apiKeys');
    apiKeysPage.waitForElementPresent('@apiKeysListItem');
  },
  'User goes to Channels View' : function(client) {
    const leftMenuPage = client.page.leftMenuPage();
    const channelsPage = client.page.channelsPage();

    leftMenuPage.clickButton('@channels');
    channelsPage.waitForElementPresent('@channelListItem');
  },
  'User goes to Classes View' : function(client) {
    const leftMenuPage = client.page.leftMenuPage();
    const classesPage = client.page.classesPage();

    leftMenuPage.clickButton('@classes');
    classesPage.waitForElementPresent('@userProfileClassName');
  },
  'User goes to CodeBox edit view' : function(client) {
    const leftMenuPage = client.page.leftMenuPage();
    const codeBoxesPage = client.page.codeBoxesPage();
    const codeBoxEditPage = client.page.codeBoxEditPage();

    leftMenuPage.clickButton('@codeBoxes');
    codeBoxesPage.clickButton('@codeBoxListItem');
    codeBoxEditPage.waitForElementPresent('@codeBoxEditView');
  },
  'User goes to CodeBox config view' : function(client) {
    const leftMenuPage = client.page.leftMenuPage();
    const codeBoxesPage = client.page.codeBoxesPage();
    const codeBoxEditPage = client.page.codeBoxEditPage();

    leftMenuPage.clickButton('@codeBoxes');
    codeBoxesPage.clickButton('@codeBoxListItem');
    codeBoxEditPage.clickButton('@config');
    codeBoxEditPage.waitForElementPresent('@configEmpty');
    codeBoxEditPage.verify.containsText('@configEmpty', '{');
  },
  'User goes to CodeBox traces view' : function(client) {
    const leftMenuPage = client.page.leftMenuPage();
    const codeBoxesPage = client.page.codeBoxesPage();
    const codeBoxEditPage = client.page.codeBoxEditPage();

    leftMenuPage.clickButton('@codeBoxes');
    codeBoxesPage.clickButton('@codeBoxListItem');
    codeBoxEditPage.clickButton('@traces');
    codeBoxEditPage.waitForElementPresent('@tracesEmpty');
  },
  'User goes to Data Objects View' : function(client) {
    const leftMenuPage = client.page.leftMenuPage();
    const classesPage = client.page.classesPage();
    const dataObjectsPage = client.page.dataObjectsPage();

    leftMenuPage.clickButton('@classes');
    classesPage.clickButton('@userClassListItem');
    dataObjectsPage.waitForElementPresent('@dataObjectsTableBody');
  },
  'User goes to Webhooks View' : function(client) {
    const dataPage = client.page.dataPage();

    dataPage.waitForElementPresent('@webhookListItem');
  },
  'User goes to Tasks View' : function(client) {
    const leftMenuPage = client.page.leftMenuPage();
    const tasksPage = client.page.tasksPage();

    leftMenuPage.clickButton('@tasks');
    tasksPage.waitForElementPresent('@scheduleListItem');
  },
  'User goes to Users View' : function(client) {
    const leftMenuPage = client.page.leftMenuPage();
    const usersPage = client.page.usersPage();

    leftMenuPage.clickButton('@users');
    usersPage.waitForElementPresent('@user');
  },
  'User goes to Webhook Traces View' : function(client) {
    const dataPage = client.page.dataPage();
    const webhookTracesPage = client.page.webhookTracesPage();

    dataPage.clickButton('@webhookListItem');
    webhookTracesPage.waitForElementPresent('@webhookTracesEmptyView');
  },
  'User goes to Solutions View' : function(client) {
    const topNavigationPage = client.page.topNavigationPage();
    const solutionsPage = client.page.solutionsPage();

    topNavigationPage.clickButton('@solutions');
    solutionsPage.waitForElementPresent('@solutionDetails');
    solutionsPage.waitForElementVisible('@solutionAvatars');
  },
  'User goes to Solution Details View' : function(client) {
    const topNavigationPage = client.page.topNavigationPage();
    const solutionsPage = client.page.solutionsPage();
    const solutionDetailsPage = client.page.solutionDetailsPage();

    topNavigationPage.clickButton('@solutions');
    solutionsPage.waitForElementPresent('@solutionsView');
    solutionsPage.clickButton('@solutionDetails');
    solutionDetailsPage.waitForElementPresent('@installSolutionButton');
  },
  'User goes to Account Profile View' : function(client) {
    const topNavigationPage = client.page.topNavigationPage();
    const profilePage = client.page.profilePage();

    topNavigationPage.clickButton('@account');
    topNavigationPage.clickButton('@accountDropdown');
    profilePage.waitForElementPresent('@updateButton')
    client.pause(1000);
  },
  'User goes to Account Authentication View' : function(client) {
    const topNavigationPage = client.page.topNavigationPage();
    const leftMenuPage = client.page.leftMenuPage();
    const authenticationPage = client.page.authenticationPage();

    topNavigationPage.clickButton('@account');
    topNavigationPage.clickButton('@accountDropdown');
    leftMenuPage.clickButton('@authentication');
    authenticationPage.waitForElementPresent('@accountKey');
    client.pause(1000);
  },
  'User goes to Account Invitations View' : function(client) {
    const topNavigationPage = client.page.topNavigationPage();
    const leftMenuPage = client.page.leftMenuPage();
    const invitationsPage = client.page.invitationsPage();

    topNavigationPage.clickButton('@account');
    topNavigationPage.clickButton('@accountDropdown');
    leftMenuPage.clickButton('@invitations');
    invitationsPage.waitForElementPresent('@emptyInvitationsView');
    client.pause(1000);
  },
  'User goes to Billing Plan View' : function(client) {
    const topNavigationPage = client.page.topNavigationPage();
    const leftMenuPage = client.page.leftMenuPage();
    const billingPlanPage = client.page.billingPlanPage();

    topNavigationPage.clickButton('@account');
    topNavigationPage.clickButton('@accountDropdown');
    leftMenuPage.clickButton('@billingPlan');
    billingPlanPage.waitForElementPresent('@openPlansExplorerButton');
    client.pause(1000);
  },
  'User goes to Payment methods view' : function(client) {
    const topNavigationPage = client.page.topNavigationPage();
    const leftMenuPage = client.page.leftMenuPage();
    const paymentMethodsPage = client.page.paymentMethodsPage();

    topNavigationPage.clickButton('@account');
    topNavigationPage.clickButton('@accountDropdown');
    leftMenuPage.clickButton('@paymentMethods');
    paymentMethodsPage.waitForElementPresent('@addPaymentButton');
    client.pause(1000);
  },
  'User goes to Invoices view' : function(client) {
    const topNavigationPage = client.page.topNavigationPage();
    const leftMenuPage = client.page.leftMenuPage();
    const invoicesPage = client.page.invoicesPage();

    topNavigationPage.clickButton('@account');
    topNavigationPage.clickButton('@accountDropdown');
    leftMenuPage.clickButton('@invoices');
    invoicesPage.waitForElementPresent('@emptyInvoicesView');
    client.pause(1000);
  },
  'User goes to Billing Address view' : function(client) {
    const topNavigationPage = client.page.topNavigationPage();
    const leftMenuPage = client.page.leftMenuPage();
    const billingAddressPage = client.page.billingAddressPage();

    topNavigationPage.clickButton('@account');
    topNavigationPage.clickButton('@accountDropdown');
    leftMenuPage.clickButton('@billingAddress');
    billingAddressPage.waitForElementPresent('@billingAddressTitle');
    client.pause(1000);
  }
};
