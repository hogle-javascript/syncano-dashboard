export default {
  tags: ['socialLogins'],
  beforeEach(client) {
    const loginPage = client.page.loginPage();

    loginPage.navigate();
  },
  afterEach(client, done) {
    client.end(done);
  },
  'Admin Logs in with Facebook': (client) => {
    const loginPage = client.page.loginPage();
    const profilePage = client.page.profilePage();

    loginPage.clickElement('@loginButtonFacebook');
    client
      .pause(1000)
      .windowHandles((result) => {
        const handle = result.value[1];

        client.switchWindow(handle);
      });
    loginPage.fillInput('@emailInputFacebook', process.env.FACEBOOK_EMAIL);
    loginPage.fillInput('@passInputFacebook', process.env.NIGHTWATCH_PASSWORD);
    loginPage.clickElement('@signInButtonFacebook');

    client.windowHandles((result) => {
      const handle = result.value[0];

      client.switchWindow(handle);
    });
    profilePage.navigate();
    profilePage.waitForElementPresent('@email');
  }
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
  //   instancesPage.waitForElementPresent('@instancesTable');
  // },
  // 'Admin Logs in with Github': (client) => {
  //   const loginPage = client.page.loginPage();
  //   const instancesPage = client.page.instancesPage();

  //   loginPage.clickElement('@loginButtonGithub');
  //   client
  //     .pause(1000)
  //     .windowHandles((result) => {
  //       const handle = result.value[1];

  //       client.switchWindow(handle);
  //     });
  //   loginPage
  //     .fillInput('@emailInputGithub', process.env.NIGHTWATCH_EMAIL)
  //     .fillInput('@passInputGithub', process.env.NIGHTWATCH_PASSWORD)
  //     .clickElement('@signInButtonGithub');

  //   client.windowHandles((result) => {
  //     const handle = result.value[0];

  //     client.switchWindow(handle);
  //   });
  //   instancesPage.waitForElementPresent('@socketsHeaderTitle');
  // }
};
