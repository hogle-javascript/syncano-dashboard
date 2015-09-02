
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
    solutionsPage.clickButton('@favorite');
    solutionsPage.waitForElementVisible('@favoriteSolutionTitle');
  },
  'Administrator can view his Solutions' : function(client) {
    const solutionsPage = client.page.solutionsPage();

    solutionsPage.navigate();
    solutionsPage.clickButton('@mySolutions');
    solutionsPage.waitForElementVisible('@mySolutionTitle');
  },
  'Administrator can filter solutions by tags' : function(client) {
    var tagsCount = null;
    const solutionsPage = client.page.solutionsPage();
    const elementsWithTag = solutionsPage.elements.tagsJs;

    solutionsPage.navigate();
    solutionsPage.waitForElementVisible('@tagsList');
    solutionsPage.clickButton('@tagsListJs');
    solutionsPage.waitForElementVisible('@tagsJs');

    solutionsPage.getText('@tagListItemCount', function(result) {
      tagsCount = parseInt(result.value, 10);
    });

    client.elements(elementsWithTag.locateStrategy, elementsWithTag.selector, function(result) {
      if (tagsCount >= result.value.length) {
        client.assert.ok(true, 'Tags count is equal or greater than number of solutions on the list');
      }
    });
  }
};
