const loginCommands = {
  typeEmail() {
    return this
      .waitForElementPresent('@emailInput')
      .setValue('@emailInput', process.env.NIGHTWATCH_EMAIL);
  },
  typePassword() {
    return this
      .waitForElementVisible('@passInput')
      .setValue('@passInput', process.env.NIGHTWATCH_PASSWORD);
  },
  clickSignInButton() {
    return this
      .waitForElementVisible('@loginButton')
      .click('@loginButton');
  },
  clickButton(button) {
    return this.waitForElementVisible(button)
      .click(button);
  },
  verifyLoginSuccessful() {
    return this
      .waitForElementVisible('@instancesDiv', 20000)
      .assert.containsText('@instancesDiv', 'My instances');
  },
  fillInputField(field, value) {
    return this.waitForElementVisible(field)
      .clearValue(field)
      .setValue(field, value);
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
    loginButtonFacebook: {
      selector: 'span.synicon-facebook'
    },
    emailInputFacebook: {
      selector: 'input[name=email]'
    },
    passInputFacebook: {
      selector: 'input[name=pass]'
    },
    signInButtonFacebook: {
      selector: 'input[name=login]'
    },
    loginButtonGoogle: {
      selector: 'span.synicon-google'
    },
    emailInputGoogle: {
      selector: 'input#Email'
    },
    passInputGoogle: {
      selector: 'input#Passwd'
    },
    nextButtonGoogle: {
      selector: 'input#next'
    },
    signInButtonGoogle: {
      selector: 'input#signIn'
    },
    approveAccessButtonGoogle: {
      selector: 'button#submit_approve_access'
    },
    mainDiv: {
      selector: 'div[id=app]'
    },
    instancesDiv: {
      selector: 'div[id=instances]'
    }
  }
};
