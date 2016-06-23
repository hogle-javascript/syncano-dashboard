import utils from '../utils';

export default {
  elements: {
    confirmButton: {
      selector: '//span[text()="Confirm"]',
      locateStrategy: 'xpath'
    },
    adminsListMenu: {
      selector: '//div[@class="admins-invitations-list"]/div[1]/div[@class="col-menu"]//button',
      locateStrategy: 'xpath'
    },
    deleteButton: {
      selector: '//div[text()="Delete"]',
      locateStrategy: 'xpath'
    },
    adminsListItem: {
      selector: '//div[text()="Owner (cannot be edited)"]',
      locateStrategy: 'xpath'
    },
    addAdminButton: {
      selector: '//span[text()="Invite"]',
      locateStrategy: 'xpath'
    },
    addAdminModalTitle: {
      selector: '//h3[text()="Invite an Administrator"]',
      locateStrategy: 'xpath'
    },
    addAdminModalEmailInput: {
      selector: '//input[@name="email"]',
      locateStrategy: 'xpath'
    },
    addAdminModalRoleDropdown: {
      selector: '(//div[@name="role"]/div/div)[1]',
      locateStrategy: 'xpath'
    },
    addAdminModalRoleDropdownRead: {
      selector: '//a[@tabindex="0"]//div[text()="read"]',
      locateStrategy: 'xpath'
    },
    adminEmailTableRow: {
      selector: `//div[text()="${utils.addSuffix('admin')}@syncano.com"]`,
      locateStrategy: 'xpath'
    },
    adminInvoTableRow: {
      selector: '//div[text()="invo@invo.com"]',
      locateStrategy: 'xpath'
    },
    selectAdminTableRow: {
      selector: `//div[text()="${utils.addSuffix('admin')}@syncano.com"]/../../../following-sibling::div//span[@class="synicon-dots-vertical"]`,
      locateStrategy: 'xpath'
    },
    adminTableRow: {
      selector: '//div[@class="admins-invitations-list"]/div[2]',
      locateStrategy: 'xpath'
    },
    deleteAdminModalTitle: {
      selector: '//h3[text()="Delete an Invitation"]',
      locateStrategy: 'xpath'
    }
  }
};
