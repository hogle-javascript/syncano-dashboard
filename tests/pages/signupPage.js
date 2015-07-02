var signupCommands = {
  clickSubmitButton: function() {
    this.api.pause(1000);
    return this.waitForElementVisible('@submitButton', 1000)
      .click('@submitButton')
      .waitForElementNotPresent('@submitButton', 5000);
  },
  clickTermsOfUseLink: function() {
    this.api.pause(1000);
    return this.waitForElementVisible('@termsOfUseLink', 1000)
      .click('@termsOfUseLink');
  }
};

module.exports = {
  url: 'https://localhost:8080/#/signup',
  commands: [signupCommands],
  elements: {
    emailInput: {
      selector: 'input[type=text]'
    },
    passInput: {
      selector: 'input[name=password]'
    },
    submitButton: {
      selector: 'button[type=submit]'
    },
    termsOfUseLink: {
      selector: 'p.vm-0-b.text--center a'
    }
  }
};
