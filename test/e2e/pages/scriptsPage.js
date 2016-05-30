import globals from '../globals';

export default {
  url: `https://localhost:8080/#/instances/${globals.instanceName}/scripts`,
  elements: {
    scriptListItem: {
      selector: '//div[text()="snippet"]',
      locateStrategy: 'xpath'
    },
    scriptMenuSelect: {
      selector: '(//span[@class="synicon-dots-vertical"])[1]',
      locateStrategy: 'xpath'
    },
    scriptsSelected: {
      selector: '.synicon-checkbox-marked-outline'
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
