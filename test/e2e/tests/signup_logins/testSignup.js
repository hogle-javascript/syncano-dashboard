import { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['signup'],
  after(client) {
    client.end();
  },
  'Test Login using email address': (client) => {
    const signupPage = client.page.signupPage();
    const tempPass = Date.now();
    const tempEmail = `syncano.bot+${tempPass}@syncano.com`;

    signupPage
      .navigate()
      .setResolution(client)
      .fillInput('@emailInput', tempEmail)
      .fillInput('@passInput', tempPass)
      .clickElement('@submitButton')
      .waitForElementNotPresent('@setupScreen')
      .waitForElementVisible('@firstLoginScreen');
  }
});
