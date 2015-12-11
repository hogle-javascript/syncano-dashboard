const signupCommands = {
  clickSubmitButton() {
    return this.waitForElementVisible('@submitButton')
      .click('@submitButton')
      .waitForElementNotPresent('@submitButton', 60000);
  },
  clickTermsOfUseLink() {
    return this.waitForElementVisible('@termsOfUseLink')
      .click('@termsOfUseLink');
  }
};

export default {
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
