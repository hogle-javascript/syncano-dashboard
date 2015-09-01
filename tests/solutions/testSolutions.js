const utils = require('../utils');

module.exports = {
  tags: ['solutions'],
  before: function(client) {
    const loginPage = client.page.loginPage();

    loginPage.goToLoginPage();
    loginPage.typeEmail();
    loginPage.typePassword();
    loginPage.clickSignInButton();
    loginPage.verifyLoginSuccessful();
  },
  after: function(client) {
    client.end();
  },
  'Administrator can view Favorite Solutions': function(client) {
    const solutionsPage = client.page.solutionsPage();

    solutionsPage.navigate();
  },
  'Administrator can view his Solutions' : function(client) {
    const solutionsPage = client.page.solutionsPage();

    solutionsPage.navigate();
  },
  'Administrator can filter solutions by tags' : function(client) {
    const solutionsPage = client.page.solutionsPage();

    solutionsPage.navigate();
  }
};
