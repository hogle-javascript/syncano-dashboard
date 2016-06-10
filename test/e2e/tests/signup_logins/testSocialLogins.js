export default {
  tags: ['socialLogins'],
  beforeEach(client) {
    const loginPage = client.page.loginPage();

    loginPage
      .navigate()
      .setResolution(client);
  },
  afterEach(client, done) {
    client.end(done);
  }
  // 'Admin Logs in with Facebook': (client) => {
  //   const loginPage = client.page.loginPage();
  //   const instancesPage = client.page.instancesPage();
  //
  //   loginPage.clickElement('@loginButtonFacebook');
  //   client
  //     .pause(1000)
  //     .windowHandles((result) => {
  //       const handle = result.value[1];
  //
  //       client.switchWindow(handle);
  //     });
  //   loginPage
  //     .fillInput('@emailInputFacebook', process.env.FACEBOOK_EMAIL)
  //     .fillInput('@passInputFacebook', process.env.NIGHTWATCH_PASSWORD)
  //     .clickElement('@signInButtonFacebook');
  //
  //   client.windowHandles((result) => {
  //     const handle = result.value[0];
  //
  //     client.switchWindow(handle);
  //   });
  //   instancesPage
  //     .navigate()
  //     .waitForElementPresent('@instancesTable');
  // }
  // 'Admin Logs in with Google': (client) => {
  //   const loginPage = client.page.loginPage();
  //   const instancesPage = client.page.instancesPage();

  //   loginPage.clickElement('@loginButtonGoogle');
  //   client
  //     .pause(1000)
  //     .windowHandles((result) => {
  //       const handle = result.value[1];

  //       client.switchWindow(handle);
  //     });
  //   loginPage
  //     .fillInput('@emailInputGoogle', process.env.NIGHTWATCH_EMAIL)
  //     .clickElement('@nextButtonGoogle')
  //     .fillInput('@passInputGoogle', process.env.NIGHTWATCH_PASSWORD)
  //     .clickElement('@signInButtonGoogle');

  //   client.pause(2000);

  //   loginPage.clickElement('@approveAccessButtonGoogle');

  //   client.windowHandles((result) => {
  //     const handle = result.value[0];

  //     client.switchWindow(handle);
  //   });
  //   instancesPage
  //     .navigate()
  //     .waitForElementPresent('@instancesTable');
  // },
  // 'Admin Logs in with Github': (client) => {
  //   const loginPage = client.page.loginPage();
  //   const instancesPage = client.page.instancesPage();
  //   const screenshotPath = './reports/';

  //   loginPage.clickElement('@loginButtonGithub');
  //   client
  //     .pause(1000)
  //     .windowHandles((result) => {
  //       const handle = result.value[1];

  //       client.assert.equal(result.value.length, 2, 'There should be two windows open.');
  //       client.switchWindow(handle);
  //     });
  //   loginPage
  //     .fillInput('@emailInputGithub', process.env.NIGHTWATCH_EMAIL)
  //     .fillInput('@passInputGithub', process.env.NIGHTWATCH_PASSWORD)
  //     .clickElement('@signInButtonGithub');

  //   client
  //     .pause(3000)
  //     .windowHandles((result) => {
  //       client.assert.equal(result.value.length, 1, 'There should be only one window open.');
  //       client.switchWindow(result.value[0]);
  //     })
  //     .pause(3000)
  //     .saveScreenshot(screenshotPath + 'GitHub-afterlogin.png');

  //   instancesPage.navigate();
  //   client
  //     .pause(3000)
  //     .saveScreenshot(screenshotPath + 'GitHub-beforeassertion.png');
  //   instancesPage
  //     .waitForElementPresent('@instancesTable');
  // }
};
