import globals from '../globals';

export default {
  url: `https://localhost:8080/#/instances/${globals.instanceName}/scripts`,
  elements: {
    scriptListItem: {
      selector: '//div[text()="snippet"]',
      locateStrategy: 'xpath'
    },
    codeBoxToSelect: {
      selector: '.col-menu .synicon-dots-vertical'
    },
    selectMultipleButton: {
      selector: '//div[text()="Select All"]',
      locateStrategy: 'xpath'
    },
    checkboxSelected: {
      selector: '.synicon-checkbox-marked-outline'
    },
    deselectMultipleButton: {
      selector: '//div[text()="Unselect All"]',
      locateStrategy: 'xpath'
    },
    deleteButton: {
      selector: '//div[text()="Delete All"]',
      locateStrategy: 'xpath'
    },
    deleteCodeBoxModalTitle: {
      selector: '//h3[text()="Delete a Script"]',
      locateStrategy: 'xpath'
    },
    confirmButton: {
      selector: '//span[text()="Confirm"]',
      locateStrategy: 'xpath'
    },
    emptyListItem: {
      selector: '.empty-list-item'
    }
  }
};
