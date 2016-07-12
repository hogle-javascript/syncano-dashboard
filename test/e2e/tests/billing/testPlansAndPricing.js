import accounts from '../../tempAccounts';
import { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['plansAndPricing'],
  before: (client) => {
    const loginPage = client.page.loginPage();
    const { email, password } = accounts.alternativeUser;

    loginPage
      .navigate()
      .setResolution(client)
      .login(email, password);
  },
  after: (client) => {
    client.end();
  },
  'User switches to production plan': (client) => {
    const billingPage = client.page.billingPlanPage();

    billingPage
      .navigate()
      .waitForElementVisible('@openPlansExplorerButton')
      .verify.containsText('@planBarLocator', 'Builder')
      .clickElement('@openPlansExplorerButton')
      .fillInput('@cardNumberInput', '4000056655665556')
      .selectDropdownValue('@monthExpirationInput', 11)
      .selectDropdownValue('@yearExpirationInput', 2021)
      .fillInput('@cvcInput', '666')
      .clickElement('@confirmButton')
      .waitForElementVisible('@openPlansExplorerButton');
    // To avoid test failing as site take some time to reload after payment
    client.pause(1500);
    billingPage
      .verify.containsText('@planBarLocator', 'Production');
  },
  'User cancels production plan': (client) => {
    const billingPage = client.page.billingPlanPage();

    billingPage
      .clickElement('@cancelPlanButton')
      .clickElement('@confirmCancelPlanButton')
      .waitForElementVisible('@openPlansExplorerButton')
      .assert.elementNotPresent('@cancelPlanButton')
      .waitForElementVisible('@expiredTextLocation')
      .assert.containsText('@expiredTextLocation', 'will expire at the end of the month');
  },
  'User sets soft & hard limits on plan usage': (client) => {
    const billingPage = client.page.billingPlanPage();

    billingPage
      .fillInput('@softLimitInput', 10)
      .fillInput('@hardLimitInput', 30)
      .click('@setLimitsButton');
  }
});
