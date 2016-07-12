import accounts from '../../tempAccounts';
import { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['nav'],
  before(client) {
    const loginPage = client.page.loginPage();
    const { email, password } = accounts.navigationUser;

    loginPage
      .navigate()
      .setResolution(client)
      .login(email, password);
  },
  after(client) {
    client.end();
  },
  beforeEach(client) {
    const instancesPage = client.page.instancesPage();

    instancesPage
      .navigate()
      .clickElement('@instancesTableName');
    client.pause(500);
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
    const billingPaymentPage = client.page.billingPaymentPage();

    topNavigationPage
      .clickElement('@account')
      .waitForElementVisible('@fox')
      .clickElement('@accountDropdown');
    leftMenuPage.clickElement('@paymentMethods');
    billingPaymentPage.waitForElementPresent('@addPaymentButton');
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
});
