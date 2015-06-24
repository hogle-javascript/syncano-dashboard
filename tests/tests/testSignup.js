module.exports = {
	tags: ['signup'],
    "Test signup" : function (client) {
        client
            .page.signupPage().goToSignupPage()
            .page.signupPage().generateEmailAddress()
            .page.signupPage().typeEmail()
            .page.signupPage().typePassword()
            .page.signupPage().clickSignInButton()
            .page.signupPage().verifySignupSuccessful()
            .end();
    }
};