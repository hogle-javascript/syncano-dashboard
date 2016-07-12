import accounts from '../../tempAccounts';
import Utils from '../../utils';

export default {
  tags: ['channels'],
  before(client) {
    const loginPage = client.page.loginPage();

    loginPage
      .navigate()
      .setResolution(client)
      .login(accounts.instanceUser.email, accounts.instanceUser.password);
  },
  after(client) {
    client.end();
  },
  'User adds a Channel Socket': (client) => {
    const channelsPage = client.page.channelsPage();
    const instanceName = accounts.instanceUser.instanceName;

    channelsPage
      .goToUrl(instanceName, 'channels')
      .waitForElementVisible('@channelSocketsListTitle')
      .clickElement('@addChannelButton')
      .waitForElementVisible('@addChannelModalTitle')
      .fillInput('@modalNameInput', Utils.addSuffix('channel'))
      .clickElement('@confirmButton')
      .clickElement('@summaryDialogCloseButton')
      .waitForElementVisible('@channelTableRow');
  },
  'User edits a Channel Socket': (client) => {
    const channelsPage = client.page.channelsPage();
    const instanceName = accounts.instanceUser.instanceName;

    channelsPage
      .goToUrl(instanceName, 'channels')
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
    const instanceName = accounts.instanceUser.instanceName;

    channelsPage
      .goToUrl(instanceName, 'channels')
      .waitForElementVisible('@channelSocketsListTitle')
      .clickListItemDropdown(Utils.addSuffix('channel'), 'Delete')
      .waitForElementVisible('@deleteChannelModalTitle')
      .clickElement('@confirmButton')
      .waitForElementNotPresent('@selectChannelTableRow');
  }
};
