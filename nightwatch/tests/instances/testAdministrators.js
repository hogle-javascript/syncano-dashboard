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

    adminsPage.navigate();
    adminsPage.waitForElementVisible('@adminsListItem');
    adminsPage.clickButton('@addAdminButton', client);
    adminsPage.waitForElementVisible('@addAdminModalTitle');
    adminsPage.fillInputField('@addAdminModalEmailInput', email, client);
    adminsPage.selectFromDropdown('@addAdminModalRoleDropdown', '@addAdminModalRoleDropdownRead', client);
    adminsPage.clickButton('@confirmButton', client);
    adminsPage.waitForElementVisible('@adminEmailTableRow');
  },
  'User deletes an Administrator': (client) => {
    const adminsPage = client.page.adminsPage();

    adminsPage.navigate();
    adminsPage.clickButton('@selectAdminTableRow', client);
    adminsPage.clickButton('@adminsListMenu', client);
    adminsPage.clickButton('@deleteButton', client);
    adminsPage.waitForElementVisible('@deleteAdminModalTitle');
    adminsPage.clickButton('@confirmButton', client);
    adminsPage.waitForElementVisible('@adminTableRow');
    adminsPage.waitForElementNotPresent('@adminEmailTableRow');
  }
};
