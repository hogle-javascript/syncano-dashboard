module.exports = function (client) {
    return {
        goToGoogle: function () {
            return client
                .url("http://www.google.com")
                .waitForElementVisible("body", 1000)
                .assert.title("Google")
                .assert.visible("input[type=text]");
        },
        searchForNightwatch: function () {
            return client
                .setValue("input[type=text]", "nightwatch")
                .waitForElementVisible("button[name=btnG]", 1000)
                .click("button[name=btnG]")
                .pause(1000);
        },
        verifyNightwatchIsFound: function () {
            return client
                .assert.containsText("#main", "The Night Watch");
        }
    };
}