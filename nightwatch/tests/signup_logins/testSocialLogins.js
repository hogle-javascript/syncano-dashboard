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
    const instancesPage = client.page.instancesPage();

    loginPage.clickElement('@loginButtonFacebook');
    client
      .pause(1000)
      .windowHandles((result) => {
        const handle = result.value[1];

        client.switchWindow(handle);
      });
    loginPage.fillInputField('@emailInputFacebook', process.env.NIGHTWATCH_EMAIL, client);
    loginPage.fillInputField('@passInputFacebook', process.env.NIGHTWATCH_PASSWORD, client);
    loginPage.clickElement('@signInButtonFacebook');

    client.windowHandles((result) => {
      const handle = result.value[0];

      client.switchWindow(handle);
    });
    instancesPage.waitForElementPresent('@socketsHeaderTitle');
  },
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
  //     .fillInputField('@emailInputGoogle', process.env.NIGHTWATCH_EMAIL, client)
  //     .clickElement('@nextButtonGoogle')
  //     .fillInputField('@passInputGoogle', process.env.NIGHTWATCH_PASSWORD, client)
  //     .clickElement('@signInButtonGoogle');

  //   client.pause(2000);
  //   loginPage.clickElement('@approveAccessButtonGoogle');

  //   client.windowHandles((result) => {
  //     const handle = result.value[0];

  //     client.switchWindow(handle);
  //   });
  //   instancesPage.waitForElementPresent('@instancesTable');
  // },
  'Admin Logs in with Github': (client) => {
    const loginPage = client.page.loginPage();
    const instancesPage = client.page.instancesPage();

    loginPage.clickElement('@loginButtonGithub');
    client
      .pause(1000)
      .windowHandles((result) => {
        const handle = result.value[1];

        client.switchWindow(handle);
      });
    loginPage.fillInputField('@emailInputGithub', process.env.NIGHTWATCH_EMAIL, client);
    loginPage.fillInputField('@passInputGithub', process.env.NIGHTWATCH_PASSWORD, client);
    loginPage.clickElement('@signInButtonGithub');

    client.windowHandles((result) => {
      const handle = result.value[0];

      client.switchWindow(handle);
    });
    instancesPage.waitForElementPresent('@socketsHeaderTitle');
  }
};
