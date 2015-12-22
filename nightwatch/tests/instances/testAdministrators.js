import utils from '../../utils';

export default {
  tags: ['administrators'],
  before: (client) => {
    const loginPage = client.page.loginPage();

    loginPage
      .navigate()
      .login(process.env.NIGHTWATCH_EMAIL, process.env.NIGHTWATCH_PASSWORD);
  },
  after: (client) => {
    client.end();
  },
  'User adds an Administrator': (client) => {
    const email = utils.addSuffix('admin') + '@syncano.com';
    const adminsPage = client.page.adminsPage();

    adminsPage
      .navigate()
      .waitForElementVisible('@adminsListItem')
      .clickElement('@addAdminButton')
      .waitForElementVisible('@addAdminModalTitle');
    adminsPage.fillInputField('@addAdminModalEmailInput', email, client);
    adminsPage.selectFromDropdown('@addAdminModalRoleDropdown', '@addAdminModalRoleDropdownRead', client);
    adminsPage.clickElement('@confirmButton')
      .waitForElementVisible('@adminEmailTableRow');
  },
  'User deletes an Administrator': (client) => {
    const adminsPage = client.page.adminsPage();

    adminsPage
      .navigate()
      .clickElement('@selectAdminTableRow')
      .clickElement('@adminsListMenu')
      .clickElement('@deleteButton')
      .waitForElementVisible('@deleteAdminModalTitle')
      .clickElement('@confirmButton')
      .waitForElementVisible('@adminTableRow')
      .waitForElementNotPresent('@adminEmailTableRow');
  }
};
