module.exports = {
  tags: ['instance'],
  before: function(client) {
    var loginPage = client.page.loginPage();
    loginPage.goToLoginPage();
    loginPage.typeEmail();
    loginPage.typePassword();
    loginPage.clickSignInButton();
    loginPage.verifyLoginSuccessful();

  },
  after: function(client) {
    client.end();
  },
  'Test Go to Instance View' : function(client) {
    var instancesPage = client.page.instancesPage();
    instancesPage.clickButton('@instancesTableRow');

    var instancePage = client.page.instancePage();

    client.pause(2000);
    instancePage.expect.element('@instancesDropdown').to.be.present.after(5000);
    instancePage.expect.element('@instancesDropdown').to.contain.text('enter_this_instance_now');

  }
};
