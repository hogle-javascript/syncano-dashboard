import Utils from '../../utils';
import accounts from '../../tempAccounts';

export default {
  tags: ['profile'],
  after(client) {
    client.end();
  },
  before(client) {
    const loginPage = client.page.loginPage();

    loginPage
      .navigate()
      .setResolution(client)
      .login(accounts.navigationUser.email, accounts.navigationUser.password);
  },
  'Administrator changes his name and surname': (client) => {
    const profilePage = client.page.profilePage();
    const firstName = Utils.addSuffix('name');
    const lastName = Utils.addSuffix('surname');

    profilePage
      .navigate()
      .waitForElementPresent('@title');

    client.pause(2000);

    profilePage
      .fillInput('@firstName', firstName)
      .fillInput('@lastName', lastName)
      .clickElement('@updateButton')
      .waitForElementPresent('@successDialog')
      .verify.value('@firstName', firstName)
      .verify.value('@lastName', lastName);
  }
};
