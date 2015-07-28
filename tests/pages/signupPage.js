var signupCommands = {
  clickSubmitButton: function() {
    return this.waitForElementVisible('@submitButton')
      .click('@submitButton')
      .waitForElementNotPresent('@submitButton');
  },
  clickTermsOfUseLink: function() {
    return this.waitForElementVisible('@termsOfUseLink')
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
