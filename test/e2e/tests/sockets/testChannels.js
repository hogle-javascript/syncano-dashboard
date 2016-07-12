import accounts from '../../tempAccounts';
import utils, { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['channels'],
  before(client) {
    const loginPage = client.page.loginPage();
    const { email, password } = accounts.instanceUser;

    loginPage
      .navigate()
      .setResolution(client)
      .login(email, password);
  },
  after(client) {
    client.end();
  },
  'User adds a Channel Socket': (client) => {
    const channelsPage = client.page.channelsPage();
    const { instanceName } = accounts.instanceUser;

    channelsPage
      .goToUrl(instanceName, 'channels')
      .waitForElementVisible('@channelSocketsListTitle')
      .clickElement('@addChannelButton')
      .waitForElementVisible('@addChannelModalTitle')
      .fillInput('@modalNameInput', utils.addSuffix('channel'))
      .clickElement('@confirmButton')
      .clickElement('@summaryDialogCloseButton')
      .waitForElementVisible('@channelTableRow');
  },
  'User edits a Channel Socket': (client) => {
    const channelsPage = client.page.channelsPage();
    const { instanceName } = accounts.instanceUser;

    channelsPage
      .goToUrl(instanceName, 'channels')
      .waitForElementVisible('@channelSocketsListTitle')
      .clickListItemDropdown(utils.addSuffix('channel'), 'Edit')
      .waitForElementVisible('@editChannelModalTitle')
      .fillInput('@channelModalDescriptionInput', utils.addSuffix('edit'))
      .clickElement('@confirmButton')
      .waitForElementVisible('@channelTableRow')
      .waitForElementVisible('@channelTableRowDescription');

    channelsPage.verify.containsText('@channelTableRowDescription', utils.addSuffix('edit'));
  },
  'User deletes a Channel Socket': (client) => {
    const channelsPage = client.page.channelsPage();
    const { instanceName } = accounts.instanceUser;

    channelsPage
      .goToUrl(instanceName, 'channels')
      .waitForElementVisible('@channelSocketsListTitle')
      .clickListItemDropdown(utils.addSuffix('channel'), 'Delete')
      .waitForElementVisible('@deleteChannelModalTitle')
      .clickElement('@confirmButton')
      .waitForElementNotPresent('@selectChannelTableRow');
  }
});
