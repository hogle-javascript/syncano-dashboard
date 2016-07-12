import accounts from '../../tempAccounts';
import { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['pushHistory'],
  before: (client) => {
    const loginPage = client.page.loginPage();
    const { email, password } = accounts.instanceUser;

    loginPage
      .navigate()
      .setResolution(client)
      .login(email, password);
  },
  after: (client) => client.end(),
  'Test User views Push Notification history': (client) => {
    const pushHistoryPage = client.page.pushHistoryPage();
    const { instanceName } = accounts.instanceUser;
    const messageListSelector = pushHistoryPage.elements.messageListItem.selector;

    pushHistoryPage
      .goToUrl(instanceName, 'push-notifications/messages/all/')
      .assertSelectedCount('xpath', messageListSelector, 2);
  }
});
