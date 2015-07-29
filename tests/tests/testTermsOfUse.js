module.exports = {
  tags: ['terms'],
  'Test': function(client) {
    var signupPage = client.page.signupPage();
    signupPage.navigate();
    signupPage.clickTermsOfUseLink();
    client.pause(1000);

    client.windowHandles(function(result) {
      var handle = result.value[1];
      client.switchWindow(handle);
    });

    var termsPage = client.page.termsPage();

    termsPage.expect.element('@termsOfUseContainer').to.be.present.after(10000);
    termsPage.expect.element('@termsOfUseContainer').to.contain.text('Terms of Service');
    client.end();
  }
};
