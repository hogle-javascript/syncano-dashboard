module.exports = {
  tags: ['topNavigation'],
  before: function(client) {
    const loginPage = client.page.loginPage();

    loginPage.navigate();
    loginPage.typeEmail();
    loginPage.typePassword();
    loginPage.clickSignInButton();
    loginPage.verifyLoginSuccessful();
  },
  after: function(client) {
    client.end();
  },
  afterEach: function(client, done) {
    client.windowHandles(function(result) {
      const handle = result.value[0];

      client.switchWindow(handle);
    });
    client.pause(500, done);
  },
  'Admin Goes to Docs page': function(client) {
    const topNavigationPage = client.page.topNavigationPage();
    const docsPage = client.page.docsPage();

    topNavigationPage.click('@docs')
    client.pause(1000);
    client.windowHandles(function(result) {
      const handle = result.value[1];

      client.switchWindow(handle);
    });
    docsPage.waitForElementVisible('@syncanoLogo');
    client.window('delete');
  },
  'Admin can view notification dropdown': function(client) {
    const topNavigationPage = client.page.topNavigationPage();

    topNavigationPage.navigate();
    topNavigationPage.click('@menuNotifications');
    topNavigationPage.waitForElementVisible('@notificationsDropdown');
  },
  'Admin Goes to Support page': function(client) {
    const topNavigationPage = client.page.topNavigationPage();
    const supportPage = client.page.supportPage();

    topNavigationPage.navigate();
    topNavigationPage.click('@support')
    client.pause(1000);
    client.windowHandles(function(result) {
      const handle = result.value[1];

      client.switchWindow(handle);
    });
    supportPage.waitForElementVisible('@supportPage');
  }
};
