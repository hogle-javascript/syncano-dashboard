var loginCommands = {
  typeEmail: function() {
    return this
      .waitForElementPresent('@emailInput')
      .setValue('@emailInput', process.env.NIGHTWATCH_EMAIL);
  },
  typePassword: function() {
    return this
      .waitForElementVisible('@passInput')
      .setValue('@passInput', process.env.NIGHTWATCH_PASSWORD);
  },
  clickSignInButton: function() {
    return this
      .waitForElementVisible('@loginButton')
      .click('@loginButton');
  },
  verifyLoginSuccessful: function() {
    return this
      .waitForElementVisible('@instancesDiv', 20000)
      .assert.containsText('@instancesDiv', 'My instances');
  }
};

module.exports = {
  url: 'https://localhost:8080/#/login',
  commands: [loginCommands],
  elements: {
    emailInput: {
      selector: 'input[type=text]'
    },
    passInput: {
      selector: 'input[name=password]'
    },
    loginButton: {
      selector: 'button[type=submit]'
    },
    mainDiv: {
      selector: 'div[id=app]'
    },
    instancesDiv: {
      selector: 'div[id=instances]'
    }
  }
};
