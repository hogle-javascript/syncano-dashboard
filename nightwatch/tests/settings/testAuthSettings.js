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

// This part is a bit wierd. I'm going to stackoverflow with the account key set as a query
// then i check the search fields value to check if the account key is there
// This is because there input fields in our app have empty value attrs so I can't use'em

    client
      .url(`http://stackoverflow.com/search?q=${Globals.tempAccountKey}`)
      .waitForElementPresent('input.textbox')
      .element('css selector', 'input.textbox', (result) => {
        client.elementIdAttribute(result.value.ELEMENT, 'value', (attribute) => {
          client.assert.equal(attribute.value, Globals.tempAccountKey);
        });
      });
  }
};
