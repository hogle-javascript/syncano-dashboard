module.exports = {
  tags: ['terms'],
  'User Goes to terms of use page': (client) => {
    const signupPage = client.page.signupPage();

    signupPage
      .navigate()
      .clickTermsOfUseLink();
    client.pause(1000);

    client.windowHandles((result) => {
      const handle = result.value[1];

      client.switchWindow(handle);
    });

    const termsPage = client.page.termsPage();

    termsPage.expect.element('@termsOfUseContainer').to.be.present.after(10000);
    termsPage.expect.element('@termsOfUseContainer').to.contain.text('Terms of Service');
    client.end();
  }
};
