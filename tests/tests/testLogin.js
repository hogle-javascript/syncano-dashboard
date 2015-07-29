module.exports = {
  tags: ['login'],
  'Test Login' : function(client) {
    client
        .page.loginPage().goToLoginPage()
        .page.loginPage().typeEmail()
        .page.loginPage().typePassword()
        .page.loginPage().clickSignInButton()
        .page.loginPage().verifyLoginSuccessful()
        .end();
  }
};
