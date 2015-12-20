import utils from '../utils';
import globals from '../globals';
import commonCommands from '../commands/commonCommands';

export default {
  url: `https://localhost:8080/#/instances/${globals.instanceName}/admins`,
  commands: [commonCommands],
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
      selector: '//div[text()="Delete an Invitation"]',
      locateStrategy: 'xpath'
    },
    adminsListItem: {
      selector: '//div[text()="Owner (cannot be edited)"]',
      locateStrategy: 'xpath'
    },
    addAdminButton: {
      selector: '//span[@class="synicon-plus-circle-outline"]',
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
      selector: '//div[@class="invite-admin-dropdown"]',
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
    selectAdminTableRow: {
      selector: `//div[text()="${utils.addSuffix('admin')}@syncano.com"]/../preceding-sibling::div`,
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
