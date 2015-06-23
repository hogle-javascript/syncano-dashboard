var LOCATORS = {
  url : "https://localhost:8080/",
  email_input : "input[name=email]",
  email : "adam.wardecki+chan@syncano.com",
  pass_input : "input[name=password]",
  pass : "chan2015",
  login_button : "button[type=submit]",
  main_div: "div[id=app]",
  table_first_row: "div.row"
}


module.exports = function (client) {
    return {
        goToLoginPage: function () {
            return client
                .url(LOCATORS['url'])
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
        },
        clickSignInButton: function () {
            return client
                .waitForElementVisible(LOCATORS["login_button"], 1000)
                .click(LOCATORS['login_button'])
        },
        verifyLoginSuccessful: function () {
            return client
                .waitForElementVisible(LOCATORS['table_first_row'], 10000)
                .assert.containsText(LOCATORS['main_div'], "Instances");
        }
    };
}