import globals from '../../globals';
import utils from '../../utils';

export default {
  tags: ['pushMessages'],
  before: (client) => {
    const loginPage = client.page.loginPage();

    loginPage
      .navigate()
      .login(process.env.NIGHTWATCH_EMAIL, process.env.NIGHTWATCH_PASSWORD);
  },
  after: (client) => {
    client.end();
  },
  'Test Admin Sends Android Push Notification': (client) => {
    const pushDevicesPage = client.page.pushDevicesPage();
    const baseUrl = 'https://api.syncano.rocks';
    const apiKey = process.env.NIGHTWATCH_ACCOUNT_KEY;
    const url = `${baseUrl}/v1.1/instances/${globals.instanceName}/push_notifications/gcm/messages/?api_key=${apiKey}`;
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
    const apiKey = process.env.NIGHTWATCH_ACCOUNT_KEY;
    const url = `${baseUrl}/v1.1/instances/${globals.instanceName}/push_notifications/apns/messages/?api_key=${apiKey}`;
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
};
