module.exports = {
  tags: ['socialLogins'],
  before(client) {
    const loginPage = client.page.loginPage();

    loginPage.navigate();
  },
  after(client) {
    client.end();
  },
  'Admin Logs in with Google': function GoogleLogin(client) {
    const loginPage = client.page.loginPage();
    const instancesPage = client.page.instancesPage();

    loginPage.clickButton('@loginButtonGoogle')
    client.pause(1000);
    client.windowHandles(function(result) {
      const handle = result.value[1];

      client.switchWindow(handle);
    });
    loginPage.fillInputField('@emailInputGoogle', process.env.NIGHTWATCH_EMAIL)
      .clickButton('@nextButtonGoogle')
      .fillInputField('@passInputGoogle', process.env.NIGHTWATCH_PASSWORD)
      .clickButton('@signInButtonGoogle')
    client.pause(2000);
    loginPage.clickButton('@approveAccessButtonGoogle')

    client.windowHandles(function(result) {
      const handle = result.value[0];

      client.switchWindow(handle);
    });
    instancesPage.waitForElementPresent('@instancesTable')
  }
};
