module.exports = {
  tags: ['signup'],
  'User signs up': function(client) {
    const signupPage = client.page.signupPage();
    const instancesPage = client.page.instancesPage();
    const slug = Date.now();

    signupPage.navigate();
    signupPage.setValue('@emailInput', 'syncano.bot+' + slug + '@syncano.com');
    signupPage.setValue('@passInput', slug);
    signupPage.clickSubmitButton();

    instancesPage.expect.element('@socketsHeaderTitle').to.be.present.after(2000);
    client.end();
  }
};
