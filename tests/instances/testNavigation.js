const path = require('path');

module.exports = {
  tags: ['navigation'],
  before(client) {
    const loginPage = client.page.loginPage();

    console.log('Starting tests');
    loginPage.navigate();
    loginPage.typeEmail();
    loginPage.typePassword();
    loginPage.clickSignInButton();
    loginPage.verifyLoginSuccessful();
  },
  after(client) {
    client.end();
  },
  beforeEach(client) {
    const instancesPage = client.page.instancesPage();
    const socketsPage = client.page.socketsPage();

    instancesPage.navigate();
    instancesPage.clickButton('@instancesTableName');
    socketsPage.waitForElementPresent('@codeBoxSocketItem');
  },

  afterEach(client, done) {
    if (!process.env.CI || process.env.CIRCLE_BRANCH !== 'screenshots') {
      done();
      return;
    }
    const res = client.globals.test_settings.resolution;
    const prefix = client.currentTest.name.replace(/\s/g, '-').replace(/"|'/g, '');
    const fileNamePath = path.resolve(path.join(client.options.screenshotsPath, '_navigation', res, prefix + '.png'));

    client.saveScreenshot(fileNamePath, done);
  },

  'User goes to Sockets View': (client) => {
    const instancesPage = client.page.instancesPage();
    const channelsPage = client.page.channelsPage();
    const schedulesPage = client.page.schedulesPage();
    const triggersPage = client.page.triggersPage();
    const socketsPage = client.page.socketsPage();

    instancesPage.navigate();
    instancesPage.clickButton('@instancesTableName');
    socketsPage.waitForElementPresent('@codeBoxSocketItem');
    socketsPage.waitForElementPresent('@dataListItem');
    channelsPage.waitForElementPresent('@channelListItem');
    schedulesPage.waitForElementPresent('@scheduleListItem');
    triggersPage.waitForElementPresent('@triggerListItem');
  },
  'User goes to General view': (client) => {
    const leftMenuPage = client.page.leftMenuPage();
    const generalPage = client.page.generalPage();
    const instanceName = client.globals.instanceName;
    const instanceNameField = generalPage.elements.instanceNameField.selector;

    leftMenuPage.clickButton('@general');
    generalPage.waitForElementPresent('@instanceNameField');
    client.getValue('xpath', instanceNameField, (result) => {
      client.assert.equal(result.value, instanceName);
    });
  },
  'User goes to Administrators View': (client) => {
    const leftMenuPage = client.page.leftMenuPage();
    const adminsPage = client.page.adminsPage();

    leftMenuPage.clickButton('@administrators');
    adminsPage.waitForElementPresent('@adminsListItem');
  },
  'User goes to API Keys View': (client) => {
    const leftMenuPage = client.page.leftMenuPage();
    const apiKeysPage = client.page.apiKeysPage();

    leftMenuPage.clickButton('@apiKeys');
    apiKeysPage.waitForElementPresent('@apiKeysListItem');
  },
  'User goes to Classes View': (client) => {
    const leftMenuPage = client.page.leftMenuPage();
    const classesPage = client.page.classesPage();

    leftMenuPage.clickButton('@classes');
    classesPage.waitForElementPresent('@userProfileClassName');
  },
  'User goes to Snippets edit view': (client) => {
    const leftMenuPage = client.page.leftMenuPage();
    const snippetsPage = client.page.snippetsPage();
    const snippetEditPage = client.page.snippetEditPage();

    leftMenuPage.clickButton('@snippets');
    snippetsPage.clickButton('@snippetListItem');
    snippetEditPage.waitForElementPresent('@snippetEditView');
  },
  'User goes to Snippet config view': (client) => {
    const leftMenuPage = client.page.leftMenuPage();
    const snippetsPage = client.page.snippetsPage();
    const snippetEditPage = client.page.snippetEditPage();

    leftMenuPage.clickButton('@snippets');
    snippetsPage.clickButton('@snippetListItem');
    snippetEditPage.clickButton('@config');
    snippetEditPage.waitForElementPresent('@configKeyField');
    snippetEditPage.waitForElementPresent('@configValueField');
    snippetEditPage.waitForElementPresent('@configAddFieldButton');
    snippetEditPage.verify.containsText('@configKeyField', '');
    snippetEditPage.verify.containsText('@configValueField', '');
  },
  'User goes to Snippet traces view': (client) => {
    const leftMenuPage = client.page.leftMenuPage();
    const snippetsPage = client.page.snippetsPage();
    const snippetEditPage = client.page.snippetEditPage();

    leftMenuPage.clickButton('@snippets');
    snippetsPage.clickButton('@snippetListItem');
    snippetEditPage.clickButton('@traces');
    snippetEditPage.waitForElementPresent('@tracesEmpty');
  },
  'User goes to Data Objects View': (client) => {
    const leftMenuPage = client.page.leftMenuPage();
    const classesPage = client.page.classesPage();
    const dataObjectsPage = client.page.dataObjectsPage();

    leftMenuPage.clickButton('@classes');
    classesPage.clickButton('@userClassListItem');
    dataObjectsPage.waitForElementPresent('@dataObjectsTableBody');
  },
  'User goes to Users & Groups View': (client) => {
    const leftMenuPage = client.page.leftMenuPage();
    const usersPage = client.page.usersPage();

    leftMenuPage.clickButton('@users');
    usersPage.waitForElementPresent('@user');
  },
  //It will be codeBox Socket traces view test when codebox start working
  //'User goes to Webhook Traces View': (client) => {
  //  const socketsPage = client.page.socketsPage();
  //  const webhookTracesPage = client.page.webhookTracesPage();
  //
  //  socketsPage.clickButton('@codeBoxSocketItem');
  //  webhookTracesPage.waitForElementPresent('@webhookTracesEmptyView');
  //},
  'User goes to Solutions View': (client) => {
    const topNavigationPage = client.page.topNavigationPage();
    const solutionsPage = client.page.solutionsPage();

    topNavigationPage.clickButton('@solutions');
    solutionsPage.waitForElementPresent('@solutionDetails');
    solutionsPage.waitForElementVisible('@solutionAvatars');
  },
  'User goes to Solution Details View': (client) => {
    const topNavigationPage = client.page.topNavigationPage();
    const solutionsPage = client.page.solutionsPage();
    const solutionDetailsPage = client.page.solutionDetailsPage();

    topNavigationPage.clickButton('@solutions');
    solutionsPage.waitForElementPresent('@solutionsView');
    solutionsPage.clickButton('@solutionDetails');
    solutionDetailsPage.waitForElementPresent('@installSolutionButton');
  },
  'User goes to Account Profile View': (client) => {
    const topNavigationPage = client.page.topNavigationPage();
    const profilePage = client.page.profilePage();

    topNavigationPage.clickButton('@account');
    topNavigationPage.waitForElementVisible('@fox');
    client.pause(1000);
    topNavigationPage.clickButton('@accountDropdown');
    profilePage.waitForElementPresent('@updateButton');
    client.pause(1000);
  },
  'User goes to Account Authentication View': (client) => {
    const topNavigationPage = client.page.topNavigationPage();
    const leftMenuPage = client.page.leftMenuPage();
    const authenticationPage = client.page.authenticationPage();

    topNavigationPage.clickButton('@account');
    client.pause(1000);
    topNavigationPage.waitForElementVisible('@fox');
    topNavigationPage.clickButton('@accountDropdown');
    leftMenuPage.clickButton('@authentication');
    authenticationPage.waitForElementPresent('@accountKey');
    client.pause(1000);
  },
  'User goes to Account Invitations View': (client) => {
    const topNavigationPage = client.page.topNavigationPage();
    const leftMenuPage = client.page.leftMenuPage();
    const invitationsPage = client.page.invitationsPage();

    topNavigationPage.clickButton('@account');
    client.pause(1000);
    topNavigationPage.waitForElementVisible('@fox');
    topNavigationPage.clickButton('@accountDropdown');
    leftMenuPage.clickButton('@invitations');
    invitationsPage.waitForElementPresent('@emptyInvitationsView');
    client.pause(1000);
  },
  'User goes to Billing Plan View': (client) => {
    const topNavigationPage = client.page.topNavigationPage();
    const leftMenuPage = client.page.leftMenuPage();
    const billingPlanPage = client.page.billingPlanPage();

    topNavigationPage.clickButton('@account');
    client.pause(1000);
    topNavigationPage.waitForElementVisible('@fox');
    topNavigationPage.clickButton('@accountDropdown');
    leftMenuPage.clickButton('@billingPlan');
    billingPlanPage.waitForElementPresent('@openPlansExplorerButton');
    client.pause(1000);
  },
  'User goes to Payment methods view': (client) => {
    const topNavigationPage = client.page.topNavigationPage();
    const leftMenuPage = client.page.leftMenuPage();
    const paymentMethodsPage = client.page.paymentMethodsPage();

    topNavigationPage.clickButton('@account');
    client.pause(1000);
    topNavigationPage.waitForElementVisible('@fox');
    topNavigationPage.clickButton('@accountDropdown');
    leftMenuPage.clickButton('@paymentMethods');
    paymentMethodsPage.waitForElementPresent('@addPaymentButton');
    client.pause(1000);
  },
  'User goes to Invoices view': (client) => {
    const topNavigationPage = client.page.topNavigationPage();
    const leftMenuPage = client.page.leftMenuPage();
    const invoicesPage = client.page.invoicesPage();

    topNavigationPage.clickButton('@account');
    client.pause(1000);
    topNavigationPage.waitForElementVisible('@fox');
    topNavigationPage.clickButton('@accountDropdown');
    leftMenuPage.clickButton('@invoices');
    invoicesPage.waitForElementPresent('@emptyInvoicesView');
    client.pause(1000);
  },
  'User goes to Billing Address view': (client) => {
    const topNavigationPage = client.page.topNavigationPage();
    const leftMenuPage = client.page.leftMenuPage();
    const billingAddressPage = client.page.billingAddressPage();

    topNavigationPage.clickButton('@account');
    client.pause(1000);
    topNavigationPage.waitForElementVisible('@fox');
    topNavigationPage.clickButton('@accountDropdown');
    leftMenuPage.clickButton('@billingAddress');
    billingAddressPage.waitForElementPresent('@billingAddressTitle');
    client.pause(1000);
  }
};
