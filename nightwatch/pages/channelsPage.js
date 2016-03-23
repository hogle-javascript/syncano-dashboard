import utils from '../utils';
import globals from '../globals';

export default {
  url: `https://localhost:8080/#/instances/${globals.instanceName}/channels`,
  elements: {
    channelListItem: {
      selector: '//div[text()="channel_123"]',
      locateStrategy: 'xpath'
    },
    confirmButton: {
      selector: '//span[text()="Confirm"]',
      locateStrategy: 'xpath'
    },
    channelSocketsListTitle: {
      selector: '//div[text()="Channels"]',
      locateStrategy: 'xpath'
    },
    addChannelButton: {
      selector: '//span[text()="Add"]',
      locateStrategy: 'xpath'
    },
    addChannelModalTitle: {
      selector: '//h3[text()="Add a Channel Socket"]',
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
  }
};
