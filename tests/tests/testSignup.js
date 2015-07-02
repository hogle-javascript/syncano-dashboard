/* jshint expr: true */
module.exports = {
  'Test': function(client) {
    var signupPage = client.page.signupPage();
    var slug = Date.now();
    signupPage.navigate();
    signupPage.setValue('@emailInput', 'syncano.bot+' + slug + '@gmail.com');
    signupPage.setValue('@passInput', slug);
    signupPage.clickSubmitButton();

    var instancesPage = client.page.instancesPage();
    instancesPage.expect.element('@instancesTable').to.be.present.after(2000);
    client.end();
  }
};
