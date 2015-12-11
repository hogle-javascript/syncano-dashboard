import utils from '../../utils';
import globals from '../../globals';

const dataObjectsCommands = {
  clickButton(button) {
    return this.waitForElementVisible(button)
      .click(button);
  },
  clickCheckbox(button) {
    return this.waitForElementPresent(button)
      .click(button);
  },
  fillInputField(field, value) {
    return this.waitForElementVisible(field)
      .clearValue(field)
      .setValue(field, '')
      .clearValue(field)
      .setValue(field, value);
  }
};

export default {
  url: 'https://localhost:8080/#/instances/' + globals.instanceName + '/classes/class/objects',
  commands: [dataObjectsCommands],
  elements: {
    instancesDropdown: {
      selector: '.instances-dropdown'
    },
    cogIcon: {
      selector: '.synicon-cog'
    },
    dataObjectsTableBody: {
      selector: '.mui-body-table'
    },
    confirm: {
      selector: '//span[text()="Confirm"]',
      locateStrategy: 'xpath'
    },
    addDataObjectButton: {
      selector: '(//span[@class="synicon-plus"])[1]',
      locateStrategy: 'xpath'
    },
    deleteDataObjectButton: {
      selector: '//span[@class="synicon-delete"]',
      locateStrategy: 'xpath'
    },
    deleteDataObjectButtonDisabled: {
      selector: '//button[@disabled]//span[@class="synicon-delete"]',
      locateStrategy: 'xpath'
    },
    stringFieldTableRow: {
      selector: '//td[text()="' + utils.addSuffix('string') + '"]',
      locateStrategy: 'xpath'
    },
    stringField: {
      selector: '//input[@name="string"]',
      locateStrategy: 'xpath'
    },
    stringFieldEditedTableRow: {
      selector: '//td[text()="' + utils.addSuffix('edited') + '"]',
      locateStrategy: 'xpath'
    },
    selectDataObjectTableRow: {
      selector: '//td[text()="' + utils.addSuffix('edited') + '"]/preceding-sibling::td//input[@type="checkbox"]',
      locateStrategy: 'xpath'
    }
  }
};
