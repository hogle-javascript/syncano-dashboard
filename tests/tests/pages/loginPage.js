var LOCATORS = {
  staging_url : "https://dashboard.syncano.rocks/#/login",
  email_input : "input[name=email]",
  email : "adam.wardecki+chan@syncano.com",
  pass_input : "input[name=password]",
  pass : "chan2015",
  login_button : "button[type=submit]",
  main_div: "div[id=app]"
}


module.exports = function (client) {
    return {
        goToLoginPage: function () {
            return client
                .url(LOCATORS['staging_url'])
                .waitForElementVisible("body", 1000)
        },
        typeEmail: function () {
            return client
                .waitForElementVisible(LOCATORS['email_input'], 5000)
                .setValue(LOCATORS['email_input'], LOCATORS['email'])
        },
        typePassword: function () {
            return client
                .waitForElementVisible(LOCATORS['pass_input'], 1000)
                .setValue(LOCATORS['pass_input'], LOCATORS['pass'])
                .pause(3000);
        },
        clickSignInButton: function () {
            return client
                .waitForElementVisible(LOCATORS["login_button"], 1000)
                .click(LOCATORS['login_button'])
                .pause(5000);
        },
        verifyLoginSuccessful: function () {
            return client
                .waitForElementVisible(LOCATORS['main_div'], 5000)
                .assert.containsText(LOCATORS['main_div'], "Instances");
        }
    };
}