import utils from '../../utils';

export default {
  tags: ['administrators'],
  before: (client) => {
    const loginPage = client.page.loginPage();

    loginPage
      .navigate()
      .setResolution(client)
      .login(process.env.NIGHTWATCH_EMAIL, process.env.NIGHTWATCH_PASSWORD);
  },
  after: (client) => {
    client.end();
  },
  'User invites an Administrator': (client) => {
    const email = utils.addSuffix('admin') + '@syncano.com';
    const adminsPage = client.page.adminsPage();

    adminsPage
      .navigate()
      .waitForElementVisible('@adminsListItem')
      .clickElement('@addAdminButton')
      .waitForElementVisible('@addAdminModalTitle')
      .fillInput('@addAdminModalEmailInput', email)
      .selectDropdownValue('@addAdminModalRoleDropdown', 'read')
      .clickElement('@confirmButton')
      .waitForElementVisible('@adminEmailTableRow');
  },
  'User deletes an Administrator invitation': (client) => {
    const adminsPage = client.page.adminsPage();

    adminsPage
      .navigate()
      .clickElement('@selectAdminTableRow')
      .clickElement('@deleteButton')
      .waitForElementVisible('@deleteAdminModalTitle')
      .clickElement('@confirmButton')
      .waitForElementNotPresent('@adminEmailTableRow')
      .waitForElementVisible('@adminInvoTableRow');
  }
};
