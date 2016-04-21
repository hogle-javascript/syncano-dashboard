import globals from '../globals';

export default {
  url: `https://localhost:8080/#/instances/${globals.instanceName}/scripts`,
  elements: {
    scriptListItem: {
      selector: '//div[text()="snippet"]',
      locateStrategy: 'xpath'
    },
    scriptMenuSelect: {
      selector: '.col-menu .synicon-dots-vertical'
    },
    selectAllButton: {
      selector: '//div[text()="Select All"]',
      locateStrategy: 'xpath'
    },
    scriptsSelected: {
      selector: '.synicon-checkbox-marked-outline'
    },
    deselectAllButton: {
      selector: '//div[text()="Unselect All"]',
      locateStrategy: 'xpath'
    },
    deleteAllButton: {
      selector: '//div[text()="Delete All"]',
      locateStrategy: 'xpath'
    },
    deleteScriptsDialogTitle: {
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
