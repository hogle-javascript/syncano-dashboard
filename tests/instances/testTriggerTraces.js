import Globals from '../globals';
import async from 'async';

export default {
  tags: ['triggerTraces'],
  after(client) {
    client.end();
  },
  'Test Trigger Traces': (client) => {
    async.waterfall([
      client.createTempAccount,
      client.createTempCodeBox,
      client.createTempTrigger,
      client.createTempUser
    ], (err) => {
      if (err) throw err;
      const loginPage = client.page.loginPage();
      const triggerTraces = client.page.triggerTracesPage();
      const url = `#/instances/${Globals.tempInstanceName}/tasks/trigger/${Globals.tempTriggerId}/traces`;

      loginPage
        .navigate()
        .login(Globals.tempEmail, Globals.tempPass)
        .verifyLoginSuccessful();

      client.urlHash(url);
      triggerTraces.waitForElementPresent('@traceCheckIcon');
      client.element('css selector', triggerTraces.elements.traceCheckIcon.selector, function(result) {
        if (result.value && result.value.ELEMENT) {
          triggerTraces.clickButton('@traceCheckIcon');
        } else {
          client.pause(5000);
          client.urlHash(url);
          triggerTraces.clickButton('@traceCheckIcon');
        }
      });
      triggerTraces.waitForElementVisible('@traceDetails');
    });
  }
};
