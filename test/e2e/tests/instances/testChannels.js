import Utils from '../../utils';

export default {
  tags: ['channels'],
  before(client) {
    const loginPage = client.page.loginPage();

    loginPage
      .navigate()
      .setResolution(client)
      .login(process.env.NIGHTWATCH_EMAIL, process.env.NIGHTWATCH_PASSWORD);
  },
  after(client) {
    client.end();
  },
  'User adds a Channel Socket': (client) => {
    const channelsPage = client.page.channelsPage();

    channelsPage
      .navigate()
      .waitForElementVisible('@channelSocketsListTitle')
      .clickElement('@addChannelButton')
      .waitForElementVisible('@addChannelModalTitle')
      .fillInput('@modalNameInput', Utils.addSuffix('channel'))
      .clickElement('@confirmButton')
      .waitForElementVisible('@channelTableRow');
  },
  'User edits a Channel Socket': (client) => {
    const channelsPage = client.page.channelsPage();

    channelsPage
      .navigate()
      .waitForElementVisible('@channelSocketsListTitle')
      .clickListItemDropdown(Utils.addSuffix('channel'), 'Edit')
      .waitForElementVisible('@editChannelModalTitle')
      .fillInput('@channelModalDescriptionInput', Utils.addSuffix('edit'))
      .clickElement('@confirmButton')
      .waitForElementVisible('@channelTableRow')
      .waitForElementVisible('@channelTableRowDescription');

    channelsPage.verify.containsText('@channelTableRowDescription', Utils.addSuffix('edit'));
  },
  'User deletes a Channel Socket': (client) => {
    const channelsPage = client.page.channelsPage();

    channelsPage
      .navigate()
      .waitForElementVisible('@channelSocketsListTitle')
      .clickListItemDropdown(Utils.addSuffix('channel'), 'Delete')
      .waitForElementVisible('@deleteChannelModalTitle')
      .clickElement('@confirmButton')
      .waitForElementNotPresent('@selectChannelTableRow');
  }
};
