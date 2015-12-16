module.exports = {
  tags: ['scheduleTraces'],
  before(client) {
    const loginPage = client.page.loginPage();

    loginPage.navigate();
    loginPage.typeEmail();
    loginPage.typePassword();
    loginPage.clickSignInButton();
    loginPage.verifyLoginSuccessful();
  },
  after(client) {
    client.end();
  },
  'User checks Schedule Traces'(client) {
    const scheduleTracesPage = client.page.scheduleTracesPage();
    const traceDateElement = scheduleTracesPage.elements.lastTraceDate.selector;
    const traceTimeElement = scheduleTracesPage.elements.lastTraceTime.selector;
    let traceDate = null;

    scheduleTracesPage.navigate();
    scheduleTracesPage.waitForElementPresent('@lastTraceDate');

    client.element('xpath', traceDateElement, function(result) {
      client.elementIdText(result.value.ELEMENT, function(text) {
        traceDate = text.value.split('/');
      });
    });
    client.element('xpath', traceTimeElement, function(result) {
      client.elementIdText(result.value.ELEMENT, function(text) {
        const now = new Date().getTime();
        const traceDateTime = Date.parse(`${traceDate[2]}-${traceDate[1]}-${traceDate[0]} ${text.value}`);
        const milliseconds = now - traceDateTime;

        client.assert.equal(true, milliseconds < 420000, 'Last schedule run less then 7 minutes ago');
      });
    });
  }
};
