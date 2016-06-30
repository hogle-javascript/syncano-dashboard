import accounts from '../../tempAccounts';

export default {
  tags: ['billingAddress'],
  beforeEach: (client) => {
    const loginPage = client.page.loginPage();

    loginPage
      .navigate()
      .setResolution(client)
      .login(accounts.instanceUser.email, accounts.instanceUser.password);
  },
  afterEach: (client, done) => {
    client.end(done);
  },
  'User adds Billing Address': (client) => {
    const billingAddressPage = client.page.billingAddressPage();

    billingAddressPage
      .navigate()
      .waitForElementPresent('@billingAddressTitle')
      .fillInput('@companyNameInput', 'E2E Inc.')
      .fillInput('@firstNameInput', 'John')
      .fillInput('@lastNameInput', 'Smith')
      .fillInput('@taxNumberInput', '555-000-555')
      .fillInput('@firstAddressInput', 'Neverland')
      .fillInput('@secondAddressInput', '12/345')
      .fillInput('@countryInput', 'El Salvado')
      .fillInput('@stateNameInput', 'Unknown')
      .fillInput('@zipCodeInput', '00-007')
      .fillInput('@cityInput', 'Norcia')
      .click('@updateButton')
      .waitForElementVisible('@successfulUpdateMessage');
  }
};
