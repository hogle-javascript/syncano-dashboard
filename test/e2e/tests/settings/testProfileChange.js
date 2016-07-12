import accounts from '../../tempAccounts';
import utils, { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['profile'],
  after(client) {
    client.end();
  },
  before(client) {
    const loginPage = client.page.loginPage();
    const { email, password } = accounts.navigationUser;

    loginPage
      .navigate()
      .setResolution(client)
      .login(email, password);
  },
  'Administrator changes his name and surname': (client) => {
    const profilePage = client.page.profilePage();
    const firstName = utils.addSuffix('name');
    const lastName = utils.addSuffix('surname');

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
});
