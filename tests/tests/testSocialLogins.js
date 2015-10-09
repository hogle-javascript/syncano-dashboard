module.exports = {
  tags: ['socialLogins'],
  beforeEach(client) {
    const loginPage = client.page.loginPage();

    loginPage.navigate();
  },
  afterEach(client, done) {
    client.end(done);
  },
  // This test works locally but will have to wait for gmail
  // Activity alerts to be turned off. Tests run from circle
  // trigger extra verification steps triggered. It takes a week to be turned off
  // https://support.google.com/mail/answer/45938?hl=en

  // 'Admin Logs in with Google': function GoogleLogin(client) {
  //   const loginPage = client.page.loginPage();
  //   const instancesPage = client.page.instancesPage();

  //   loginPage.clickButton('@loginButtonGoogle')
  //   client.pause(1000);
  //   client.windowHandles(function(result) {
  //     const handle = result.value[1];

  //     client.switchWindow(handle);
  //   });
  //   loginPage.fillInputField('@emailInputGoogle', process.env.NIGHTWATCH_EMAIL)
  //     .clickButton('@nextButtonGoogle')
  //     .fillInputField('@passInputGoogle', process.env.NIGHTWATCH_PASSWORD)
  //     .clickButton('@signInButtonGoogle')
  //   client.pause(2000);
  //   loginPage.clickButton('@approveAccessButtonGoogle')

  //   client.windowHandles(function(result) {
  //     const handle = result.value[0];

  //     client.switchWindow(handle);
  //   });
  //   instancesPage.waitForElementPresent('@instancesTable')
  // },
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
  // 'Admin Logs in with Github': function GithubLogin(client) {
  //   const loginPage = client.page.loginPage();
  //   const instancesPage = client.page.instancesPage();


  //   loginPage.clickButton('@loginButtonGithub')
  //   client.pause(1000);
  //   client.windowHandles(function(result) {
  //     const handle = result.value[1];

  //     client.switchWindow(handle);
  //   });
  //   loginPage.fillInputField('@emailInputGithub', process.env.NIGHTWATCH_EMAIL)
  //     .fillInputField('@passInputGithub', process.env.NIGHTWATCH_PASSWORD)
  //     .clickButton('@signInButtonGithub');

  //   client.windowHandles(function(result) {
  //     const handle = result.value[0];

  //     client.switchWindow(handle);
  //   });
  //   instancesPage.waitForElementPresent('@instancesTable')
  // }
};
