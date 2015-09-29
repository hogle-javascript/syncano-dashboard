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
  'User Goes to Docs page': function(client) {
    const topNavigationPage = client.page.topNavigationPage();
    const docsPage = client.page.docsPage();

    topNavigationPage.click('@docs')
    client.pause(1000);
    client.windowHandles(function(result) {
      const handle = result.value[1];

      client.switchWindow(handle);
    });

    docsPage.waitForElementVisible('@syncanoLogo');
  },
  'User can view notification dropdown': function(client) {
    const topNavigationPage = client.page.topNavigationPage();

    topNavigationPage.navigate();
    topNavigationPage.click('@menuNotifications');
    topNavigationPage.waitForElementVisible('@notificationsDropdown');
  }
};
