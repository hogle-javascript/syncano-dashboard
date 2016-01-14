import Globals from '../../globals';
import Async from 'async';
import Utils from '../../utils';

export default {
  tags: ['settings'],
  after: (client) => {
    client.end();
  },
  'Test create Account': (client) => {
    Async.waterfall([
      client.createTempAccount
    ], (err) => {
      if (err) throw err;
      const loginPage = client.page.loginPage();

      loginPage
        .navigate()
        .waitForElementPresent('@emailInput', 60000)
        .login(Globals.tempEmail, Globals.tempPass);
    });
  },
  'Test Administrator copies an Account key': (client) => {
    const authenticationPage = client.page.authenticationPage();

    authenticationPage
      .navigate()
      .clickElement('@copyButton');

// This part is a bit wierd. I'm going to google, paste the account key and assert if an element
// With the account key text is present on the page. Our input fields don't allow to check for
// text values and that's why I'm going to google page

    client
      .url('https://www.google.pl/')
      .clickElement('input[name=q]')
      .waitForElementPresent('input[name=q]', function() {
        client.keys([Utils.cmdOrCtrl(), 'v']);
      })
      .clickElement('button.lsb')
      .element('xpath', '//div[@class="mnr-c"]//em', (result) => {
        client.elementIdText(result.value.ELEMENT, (text) => {
          client.assert.equal(text.value, Globals.tempAccountKey);
        });
      });
  }
};
