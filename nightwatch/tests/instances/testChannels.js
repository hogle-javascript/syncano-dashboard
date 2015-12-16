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

    socketsPage
      .navigate()
      .waitForElementVisible('@channelSocketsListTitle')
      .clickButton('@addChannelButton')
      .waitForElementVisible('@addChannelModalTitle')
      .fillInputField('@modalNameInput', channel)
      .clickButton('@confirmButton')
      .waitForElementVisible('@channelTableRow');
  },
  'User edits a Channel Socket': (client) => {
    const socketsPage = client.page.socketsPage();

    socketsPage
      .navigate()
      .waitForElementVisible('@channelSocketsListTitle')
      .clickButton('@channelSocketDropDown');
    client.pause(1000);

    socketsPage
      .clickButton('@editDropdownItem')
      .waitForElementVisible('@editChannelModalTitle')
      .fillInputField('@modalDescriptionInput', 'channel_description');
    client.pause(1000);
    socketsPage
      .clickButton('@confirmButton')
      .waitForElementVisible('@channelTableRow')
      .waitForElementVisible('@channelTableRowDescription');
  },
  'User deletes a Channel Socket': (client) => {
    const socketsPage = client.page.socketsPage();

    socketsPage
      .navigate()
      .waitForElementVisible('@channelSocketsListTitle')
      .clickButton('@channelSocketDropDown');
    client.pause(1000);

    socketsPage
      .clickButton('@deleteDropdownItem')
      .waitForElementVisible('@deleteChannelModalTitle');
    client.pause(1000);
    socketsPage.clickButton('@confirmButton');
    client.pause(1000);
    socketsPage.waitForElementNotPresent('@selectChannelTableRow');
  }
};
