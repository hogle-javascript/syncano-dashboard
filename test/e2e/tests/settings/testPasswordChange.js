import accounts from '../../tempAccounts';
import utils from '../../utils';

export default {
  tags: ['passwordSettings'],
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
  'Administrator resets his password': (client) => {
    const authenticationPage = client.page.authenticationPage();
    const newPassword = utils.addSuffix('pass');

    authenticationPage
      .navigate()
      .fillInput('@currentPassword', accounts.navigationUser.password)
      .fillInput('@newPassword', newPassword)
      .fillInput('@confirmNewPassword', newPassword)
      .clickElement('@updateButton')
      .waitForElementPresent('@notificationMessage');
  },
  'Administrator logs in with a new password': (client) => {
    const topNavigationPage = client.page.topNavigationPage();
    const loginPage = client.page.loginPage();
    const newPassword = utils.addSuffix('pass');

    topNavigationPage
      .clickElement('@account')
      .clickElement('@logoutDropdown');

    loginPage
      .navigate()
      .login(accounts.navigationUser.email, newPassword);

    accounts.navigationUser.password = newPassword;
  }
};

