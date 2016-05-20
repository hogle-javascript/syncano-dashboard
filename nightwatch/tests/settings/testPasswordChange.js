import Utils from '../../utils';
import Globals from '../../globals';
import Async from 'async';

export default {
  tags: ['passwordSettings'],
  after(client) {
    client.end();
  },
  'Test create Account': (client) => {
    Async.waterfall([
      client.createTempAccount
    ], (err) => {
      if (err) throw err;
      const loginPage = client.page.loginPage();

      loginPage
        .navigate()
        .waitForElementPresent('@emailInput', 60000)
        .login(Globals.tempEmail, Globals.tempPass);
    });
  },
  'Administrator resets his password': (client) => {
    const authenticationPage = client.page.authenticationPage();
    const newPassword = Utils.addSuffix('pass');

    authenticationPage
      .navigate()
      .fillInput('@currentPassword', Globals.tempPass)
      .fillInput('@newPassword', newPassword)
      .fillInput('@confirmNewPassword', newPassword)
      .clickElement('@updateButton')
      .waitForElementPresent('@notificationMessage');
  },
  'Administrator logs in with a new password': (client) => {
    const topNavigationPage = client.page.topNavigationPage();
    const loginPage = client.page.loginPage();
    const newPassword = Utils.addSuffix('pass');

    topNavigationPage
      .clickElement('@account')
      .clickElement('@logoutDropdown');

    loginPage
      .navigate()
      .login(Globals.tempEmail, newPassword);
  }
};

