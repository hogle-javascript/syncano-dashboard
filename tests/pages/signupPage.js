var LOCATORS = {
  url : "https://localhost:8080/#/signup",
  email_input : "input[name=email]",
  pass_input : "input[name=password]",
  login_button : "button[type=submit]",
  main_div: "div[id=app]",
  table_first_row: "div.row"
}

var dateNow = Date.now()

module.exports = function (client) {
    return {
        generateEmailAddress: function () {
            return var username = "syncano.bot" + dateNow + "@gmail.com"
        },
        goToSignupPage: function () {
            return client
                .url(LOCATORS['url'])
                .waitForElementVisible("body", 1000)
        },
        typeEmail: function () {
            return client
                .waitForElementVisible(LOCATORS['email_input'], 5000)
                .setValue(LOCATORS['email_input'], username)
        },
        typePassword: function () {
            return client
                .waitForElementVisible(LOCATORS['pass_input'], 1000)
                .setValue(LOCATORS['pass_input'], dateNow)
        },
        clickSignInButton: function () {
            return client
                .waitForElementVisible(LOCATORS["login_button"], 1000)
                .click(LOCATORS['login_button'])
        },
        verifySignupSuccessful: function () {
            return client
                .waitForElementVisible(LOCATORS['table_first_row'], 10000)
                .assert.containsText(LOCATORS['main_div'], "Instances");
        }
    };
}