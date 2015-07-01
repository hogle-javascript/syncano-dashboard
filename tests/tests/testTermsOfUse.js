/* jshint expr: true */
module.exports = {
  'Test': function (client) {
    var signupPage = client.page.signupPage();
    signupPage.navigate();
    signupPage.clickTermsOfUseLink();

    client.window_handles(function(result) {
      var handle = result.value[1];
      client.switchWindow(handle);
    });

    var termsPage = client.page.termsPage();

    termsPage.expect.element('@termsOfUseContainer').to.be.present.after(2000);
    termsPage.expect.element('@termsOfUseContainer').to.contain.text('Terms of Service');
    client.end();
  }
};