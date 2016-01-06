import utils from '../utils';
import globals from '../globals';
import commonCommands from '../commands/commonCommands';

export default {
  url: `https://localhost:8080/#/instances/${globals.instanceName}/classes/class/objects`,
  commands: [commonCommands],
  elements: {
    instancesDropdown: {
      selector: '.instances-dropdown'
    },
    cogIcon: {
      selector: '.synicon-cog'
    },
    dataObjectsTableBody: {
      selector: '//tbody[@class="mui-table-body"]',
      locateStrategy: 'xpath'
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
      selector: `//td[text()="${utils.addSuffix('string')}"]`,
      locateStrategy: 'xpath'
    },
    stringField: {
      selector: '//input[@name="string"]',
      locateStrategy: 'xpath'
    },
    stringFieldEditedTableRow: {
      selector: `//td[text()="${utils.addSuffix('edited')}"]`,
      locateStrategy: 'xpath'
    },
    selectDataObjectTableRow: {
      selector: `//td[text()="${utils.addSuffix('edited')}"]/preceding-sibling::td//input[@type="checkbox"]`,
      locateStrategy: 'xpath'
    }
  }
};
