module.exports = {
  tags: ['socialLogins'],
  beforeEach(client) {
    const loginPage = client.page.loginPage();

    loginPage.navigate();
  },
  afterEach(client, done) {
    client.end(done);
  },
  'Admin Logs in with Facebook': function FacebookLogin(client) {
    const loginPage = client.page.loginPage();
    const instancesPage = client.page.instancesPage();

    loginPage.clickButton('@loginButtonFacebook')
    client.pause(1000);
    client.windowHandles(function(result) {
      const handle = result.value[1];

      client.switchWindow(handle);
    });
    loginPage.fillInputField('@emailInputFacebook', process.env.NIGHTWATCH_EMAIL)
      .fillInputField('@passInputFacebook', process.env.NIGHTWATCH_PASSWORD)
      .clickButton('@signInButtonFacebook');

    client.windowHandles(function(result) {
      const handle = result.value[0];

      client.switchWindow(handle);
    });
    instancesPage.waitForElementPresent('@instancesTable')
  }
};
