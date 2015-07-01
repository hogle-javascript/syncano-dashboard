var LOCATORS = {
  url          : 'https://localhost:8080/',
  emailInput   : 'input[name=email]',
  email        : 'adam.wardecki+chan@syncano.com',
  passInput    : 'input[name=password]',
  pass         : 'chan2015',
  loginButton  : 'button[type=submit]',
  mainDiv      : 'div[id=app]',
  instancesDiv : 'div[id=instances]'
};

module.exports = function(client) {
  return {
    goToLoginPage: function() {
      return client
        .url(LOCATORS.url)
        .waitForElementVisible('body', 1000)
    },
    typeEmail: function() {
      return client
        .waitForElementPresent(LOCATORS.emailInput, 5000)
        .setValue(LOCATORS.emailInput, LOCATORS.email)
    },
    typePassword: function() {
      return client
        .waitForElementVisible(LOCATORS.passInput, 1000)
        .setValue(LOCATORS.passInput, LOCATORS.pass)
        .pause(3000);
    },
    clickSignInButton: function() {
      return client
        .waitForElementVisible(LOCATORS.loginButton, 1000)
        .click(LOCATORS.loginButton)
        .pause(5000);
    },
    verifyLoginSuccessful: function() {
      return client
        .waitForElementVisible(LOCATORS.instancesDiv, 20000)
        .assert.containsText(LOCATORS.instancesDiv, 'My instances');
    }
  };
};

