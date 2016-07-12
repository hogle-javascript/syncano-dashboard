import accounts from '../../tempAccounts';
import utils, { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['pushMessages'],
  before: (client) => {
    const loginPage = client.page.loginPage();
    const { email, password } = accounts.instanceUser;

    loginPage
      .navigate()
      .setResolution(client)
      .login(email, password);
  },
  after: (client) => {
    client.end();
  },
  'Test Admin Sends Android Push Notification': (client) => {
    const pushDevicesPage = client.page.pushDevicesPage();
    const baseUrl = 'https://api.syncano.rocks';
    const { accountKey } = accounts.instanceUser;
    const { instanceName } = accounts.instanceUser;
    const url = `${baseUrl}/v1.1/instances/${instanceName}/push_notifications/gcm/messages/?api_key=${accountKey}`;
    const regId = utils.randomString(64);
    const postData = `
      {
          "content": {
              "data": {
                  "message": "sample message"
              },
              "environment": "development",
              "registration_ids": [
                  "${regId}"
              ]
          }
      }
    `;

    client
      .url(url);

    pushDevicesPage
      .waitForElementVisible('@apiTab')
      .click('@apiTab')
      .fillInput('@apiContentTextarea', `${postData}`)
      .click('@apiPostButton');

    client
      .pause(500);

    pushDevicesPage
      .assert.containsText('@apiResponseHeader', 'HTTP 201 Created')
      .assert.containsText('@apiResponseBody', `\"${regId}\"`);
  },
  'Test Admin Sends iOS Push Notification': (client) => {
    const pushDevicesPage = client.page.pushDevicesPage();
    const baseUrl = 'https://api.syncano.rocks';
    const { accountKey } = accounts.instanceUser;
    const { instanceName } = accounts.instanceUser;
    const url = `${baseUrl}/v1.1/instances/${instanceName}/push_notifications/apns/messages/?api_key=${accountKey}`;
    const regId = utils.randomString(64);
    const postData = `
      {
          "content": {
              "aps": {
                  "alert": {
                      "body": "Your push notification text would go here.",
                      "title": "App name"
                  }
              },
              "environment": "development",
              "registration_ids": [
                  "${regId}"
              ]
          },
          "serialize": true
      }
    `;

    client
      .url(url);

    pushDevicesPage
      .waitForElementVisible('@apiTab')
      .click('@apiTab')
      .fillInput('@apiContentTextarea', `${postData}`)
      .click('@apiPostButton');

    client
      .pause(500);

    pushDevicesPage
      .assert.containsText('@apiResponseHeader', 'HTTP 201 Created')
      .assert.containsText('@apiResponseBody', `\"${regId}\"`);
  }
});
