module.exports = {
    "Demo test Google" : function (client) {
        client
            .page.google().goToGoogle()
            .page.google().searchForNightwatch()
            .page.google().verifyNightwatchIsFound()
            .end();
    }
};