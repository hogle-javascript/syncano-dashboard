module.exports = {
  tags: ['topNavigation'],
  before(client) {
    const loginPage = client.page.loginPage();

    loginPage
      .navigate()
      .setResolution(client)
      .login(process.env.NIGHTWATCH_EMAIL, process.env.NIGHTWATCH_PASSWORD);
  },
  after(client) {
    client.end();
  },
  afterEach(client, done) {
    client.windowHandles((result) => {
      const handle = result.value[0];

      client.switchWindow(handle);
    });
    client.pause(500, done);
  },
  'Admin Goes to Docs page': (client) => {
    const topNavigationPage = client.page.topNavigationPage();
    const docsPage = client.page.docsPage();

    topNavigationPage.clickElement('@docs', client);
    client.windowHandles((result) => {
      const handle = result.value[1];

      client.switchWindow(handle);
    });
    docsPage.waitForElementVisible('@syncanoLogo');
    client.window('delete');
  },
  'Admin can view notification dropdown': (client) => {
    const topNavigationPage = client.page.topNavigationPage();

    topNavigationPage
      .navigate()
      .clickElement('@menuNotifications')
      .waitForElementVisible('@notificationsDropdown');
  }
};
