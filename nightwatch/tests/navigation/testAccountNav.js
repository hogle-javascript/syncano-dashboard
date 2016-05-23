import path from 'path';

module.exports = {
  tags: ['nav'],
  before(client) {
    const loginPage = client.page.loginPage();

    loginPage
      .navigate()
      .setResolution(client)
      .login(process.env.NIGHTWATCH_EMAIL, process.env.NIGHTWATCH_PASSWORD);
  },
  after(client) {
    client.end();
  },
  beforeEach(client) {
    const instancesPage = client.page.instancesPage();
    const socketsPage = client.page.socketsPage();

    instancesPage
      .navigate()
      .setResolution(client)
      .clickElement('@instancesTableName');
    socketsPage.waitForElementPresent('@dataEndpointListItemTitle');
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
  'User goes to Account Profile View': (client) => {
    const topNavigationPage = client.page.topNavigationPage();
    const profilePage = client.page.profilePage();

    topNavigationPage
      .clickElement('@account')
      .waitForElementVisible('@fox')
      .clickElement('@accountDropdown');
    profilePage.waitForElementPresent('@updateButton');
  },
  'User goes to Account Authentication View': (client) => {
    const topNavigationPage = client.page.topNavigationPage();
    const leftMenuPage = client.page.leftMenuPage();
    const authenticationPage = client.page.authenticationPage();

    topNavigationPage
      .clickElement('@account')
      .waitForElementVisible('@fox')
      .clickElement('@accountDropdown');
    leftMenuPage.clickElement('@authentication');
    authenticationPage.waitForElementPresent('@accountKey');
  },
  'User goes to Account Invitations View': (client) => {
    const topNavigationPage = client.page.topNavigationPage();
    const leftMenuPage = client.page.leftMenuPage();
    const invitationsPage = client.page.invitationsPage();

    topNavigationPage
      .clickElement('@account')
      .waitForElementVisible('@fox')
      .clickElement('@accountDropdown');
    leftMenuPage.clickElement('@invitations');
    invitationsPage.waitForElementPresent('@emptyInvitationsView');
  },
  'User goes to Billing Plan View': (client) => {
    const topNavigationPage = client.page.topNavigationPage();
    const leftMenuPage = client.page.leftMenuPage();
    const billingPlanPage = client.page.billingPlanPage();

    topNavigationPage
      .clickElement('@account')
      .waitForElementVisible('@fox')
      .clickElement('@accountDropdown');
    leftMenuPage.clickElement('@billingPlan');
    billingPlanPage.waitForElementPresent('@openPlansExplorerButton');
  },
  'User goes to Payment methods view': (client) => {
    const topNavigationPage = client.page.topNavigationPage();
    const leftMenuPage = client.page.leftMenuPage();
    const paymentMethodsPage = client.page.paymentMethodsPage();

    topNavigationPage
      .clickElement('@account')
      .waitForElementVisible('@fox')
      .clickElement('@accountDropdown');
    leftMenuPage.clickElement('@paymentMethods');
    paymentMethodsPage.waitForElementPresent('@addPaymentButton');
  },
  'User goes to Invoices view': (client) => {
    const topNavigationPage = client.page.topNavigationPage();
    const leftMenuPage = client.page.leftMenuPage();
    const invoicesPage = client.page.invoicesPage();

    topNavigationPage
      .clickElement('@account')
      .waitForElementVisible('@fox')
      .clickElement('@accountDropdown');
    leftMenuPage.clickElement('@invoices');
    invoicesPage.waitForElementPresent('@emptyInvoicesView');
  },
  'User goes to Billing Address view': (client) => {
    const topNavigationPage = client.page.topNavigationPage();
    const leftMenuPage = client.page.leftMenuPage();
    const billingAddressPage = client.page.billingAddressPage();

    topNavigationPage
      .clickElement('@account')
      .waitForElementVisible('@fox')
      .clickElement('@accountDropdown');
    leftMenuPage.clickElement('@billingAddress');
    billingAddressPage.waitForElementPresent('@billingAddressTitle');
  }
};
