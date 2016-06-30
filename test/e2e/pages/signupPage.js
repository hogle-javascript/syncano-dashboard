const signupCommands = {
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
    setupScreen: {
      selector: '//div[@class="col-flex-1"]/div[@class="vm-3-b"]',
      locateStrategy: 'xpath'
    },
    firstLoginScreen: {
      selector: '//div[@class="col-flex-1"]/div/div/div/div/div[@style="text-align: center; font-size: 25px; line-height: 34px; font-weight: 500; color: rgb(74, 74, 74); margin-bottom: 10px;"]',
      locateStrategy: 'xpath'
    },
    termsOfUseLink: {
      selector: 'p.vm-0-b.text--center a'
    }
  }
};
