module.exports = {
  tags: ['docs'],
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
    const instancesPage = client.page.instancesPage();
    const docsPage = client.page.docsPage();

    instancesPage.clickButton('@docsLink')
    client.pause(1000);

    client.windowHandles(function(result) {
      const handle = result.value[1];
      client.switchWindow(handle);
    });

    docsPage.waitForElementVisible('@syncanoLogo');
  }
};
