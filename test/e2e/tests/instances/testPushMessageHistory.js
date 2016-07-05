import accounts from '../../tempAccounts';

export default {
  tags: ['pushHistory'],
  before: (client) => {
    const loginPage = client.page.loginPage();

    loginPage
      .navigate()
      .setResolution(client)
      .login(accounts.instanceUser.email, accounts.instanceUser.password);
  },
  after: (client) => {
    client.end();
  },
  'Test User views Push Notification history': (client) => {
    const pushHistoryPage = client.page.pushHistoryPage();
    const { instanceName } = accounts.instanceUser;
    const messageListSelector = pushHistoryPage.elements.messageListItem.selector;

    pushHistoryPage
      .goToUrl(instanceName, 'push-notifications/messages/all/')
      .assertSelectedCount('xpath', messageListSelector, 2);
  }
};
