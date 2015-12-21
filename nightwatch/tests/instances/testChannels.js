import utils from '../../utils';

export default {
  tags: ['channels'],
  before(client) {
    const loginPage = client.page.loginPage();

    loginPage
      .navigate()
      .login(process.env.NIGHTWATCH_EMAIL, process.env.NIGHTWATCH_PASSWORD);
  },
  after(client) {
    client.end();
  },
  'User adds a Channel Socket': (client) => {
    const channel = utils.addSuffix('channel');
    const socketsPage = client.page.socketsPage();

    socketsPage.navigate();
    socketsPage.waitForElementVisible('@channelSocketsListTitle');
    socketsPage.clickButton('@addChannelButton', client);
    socketsPage.waitForElementVisible('@addChannelModalTitle');
    socketsPage.fillInputField('@modalNameInput', channel, client);
    socketsPage.clickButton('@confirmButton', client);
    socketsPage.waitForElementVisible('@channelTableRow');
  },
  'User edits a Channel Socket': (client) => {
    const socketsPage = client.page.socketsPage();

    socketsPage.navigate();
    socketsPage.waitForElementVisible('@channelSocketsListTitle');
    socketsPage.clickButton('@channelSocketDropDown', client);
    socketsPage.clickButton('@editDropdownItem', client);
    socketsPage.waitForElementVisible('@editChannelModalTitle');
    socketsPage.fillInputField('@modalDescriptionInput', 'channel_description', client);
    socketsPage.clickButton('@confirmButton', client);
    socketsPage.waitForElementVisible('@channelTableRow');
    socketsPage.waitForElementVisible('@channelTableRowDescription');
  },
  'User deletes a Channel Socket': (client) => {
    const socketsPage = client.page.socketsPage();

    socketsPage.navigate();
    socketsPage.waitForElementVisible('@channelSocketsListTitle');
    socketsPage.clickButton('@channelSocketDropDown', client);
    socketsPage.clickButton('@deleteDropdownItem', client);
    socketsPage.waitForElementVisible('@deleteChannelModalTitle');
    socketsPage.clickButton('@confirmButton', client);
    socketsPage.waitForElementNotPresent('@selectChannelTableRow');
  }
};
