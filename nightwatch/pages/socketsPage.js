import utils from '../utils';
import globals from '../globals';

export default {
  url: `https://localhost:8080/#/instances/${globals.instanceName}/sockets`,
  elements: {
    instancesDropdown: {
      selector: '.instances-dropdown'
    },
    cogIcon: {
      selector: '.synicon-cog'
    },
    confirmButton: {
      selector: '//span[text()="Confirm"]',
      locateStrategy: 'xpath'
    },
    addCodeBoxButton: {
      selector: '//span[@class="synicon-socket-script-endpoint"]',
      locateStrategy: 'xpath'
    },
    codeBoxSocketItem: {
      selector: '//div[text()="webhook_description"]',
      locateStrategy: 'xpath'
    },
    codeBoxSocketItemTraces: {
      selector: '//div[text()="webhook_description"]/following-sibling::div[2]/a',
      locateStrategy: 'xpath'
    },
    addCodeBoxModalTitle: {
      selector: '//h3[text()="Create a Script Endpoint"]',
      locateStrategy: 'xpath'
    },
    modalNameInput: {
      selector: '//input[@name="name"]',
      locateStrategy: 'xpath'
    },
    modalDescriptionInput: {
      selector: '//input[@name="description"]',
      locateStrategy: 'xpath'
    },
    channelModalDescriptionInput: {
      selector: '//textarea[@name="description"]',
      locateStrategy: 'xpath'
    },
    addCodeBoxModalScriptDropdown: {
      selector: '//div[@class="script-dropdown"]',
      locateStrategy: 'xpath'
    },
    codeBoxTableRow: {
      selector: `//div[text()="${utils.addSuffix('script')}"]`,
      locateStrategy: 'xpath'
    },
    codeBoxTableRowDescription: {
      selector: `//div[text()="${utils.addSuffix('script')}"]/../../../following-sibling::div[1]`,
      locateStrategy: 'xpath'
    },
    deleteCodeBoxModalTitle: {
      selector: '//h3[text()="Delete a Script Endpoint"]',
      locateStrategy: 'xpath'
    },
    editCodeBoxModalTitle: {
      selector: '//h3[text()="Edit a Script Endpoint"]',
      locateStrategy: 'xpath'
    },
    dataListItem: {
      selector: '//div[text()="data_view"]',
      locateStrategy: 'xpath'
    },
    dataListItemTitle: {
      selector: '//div[text()="Data Sockets"]',
      locateStrategy: 'xpath'
    },
    codeBoxToSelect: {
      selector: '.col-xs-12 .synicon-arrow-up-bold'
    },
    checkboxToSelect: {
      selector: '.synicon-checkbox-blank-outline'
    },
    checkboxSelected: {
      selector: '.synicon-checkbox-marked-outline'
    },
    selectMultipleButton: {
      selector: '.synicon-checkbox-multiple-marked-outline'
    },
    deselectMultipleButton: {
      selector: '.synicon-checkbox-multiple-blank-outline'
    },
    emptyListItem: {
      selector: '.empty-list-item'
    },
    dataSocketTableTitle: {
      selector: '//div[text()="Data Sockets"]',
      locateStrategy: 'xpath'
    },
    emptySocketsHeading: {
      selector: '//div[text()="Start building your app here"]',
      locateStrategy: 'xpath'
    },
    channelSocketsListTitle: {
      selector: '//div[text()="Channel Sockets"]',
      locateStrategy: 'xpath'
    },
    addChannelButton: {
      selector: '//span[@class="synicon-socket-channel"]',
      locateStrategy: 'xpath'
    },
    addChannelModalTitle: {
      selector: '//h3[text()="Create a Channel Socket"]',
      locateStrategy: 'xpath'
    },
    editChannelModalTitle: {
      selector: '//h3[text()="Edit a Channel Socket"]',
      locateStrategy: 'xpath'
    },
    deleteChannelModalTitle: {
      selector: '//h3[text()="Delete a Channel Socket"]',
      locateStrategy: 'xpath'
    },
    channelTableRow: {
      selector: `//div[text()="${utils.addSuffix('channel')}"]`,
      locateStrategy: 'xpath'
    },
    selectChannelTableRow: {
      selector: `//div[text()="${utils.addSuffix('channel')}"]/../../div[1]/span`,
      locateStrategy: 'xpath'
    },
    channelTableRowDescription: {
      selector: `//div[text()="${utils.addSuffix('channel')}"]/../../../following-sibling::div[1]`,
      locateStrategy: 'xpath'
    },
    channelSocketDropDown: {
      selector: `//div[text()="${utils.addSuffix('channel')}"]/../../../..//button`,
      locateStrategy: 'xpath'
    }
  }
};
