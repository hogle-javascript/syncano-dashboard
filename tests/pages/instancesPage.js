var instancesCommands = {
  clickFAB: function() {
    return this.waitForElementVisible('@fab', 1000)
      .click('@fab')
      .waitForElementVisible('@confirmButton', 5000);
  },
  fillInstanceName: function() {
    return this.waitForElementVisible('@createModalNameInput', 1000)
      .setValue('@createModalNameInput', 'nightwatch_test_instance');
  },
  fillInstanceDescription: function(description) {
    return this.waitForElementVisible('@createModalDescriptionInput', 1000)
      .clearValue('@createModalDescriptionInput')
      .setValue('@createModalDescriptionInput', description);
  },
  clickSelectInstance: function() {
    return this.waitForElementVisible('@selectInstance', 5000)
      .click('@selectInstance');
  },
  clickButton: function(button) {
    return this.waitForElementVisible(button)
      .click(button);
  },
  isModalClosed: function(element) {
    return this.waitForElementNotVisible(element, 5000);
  },
};

module.exports = {
  url: 'https://localhost:8080/#/instances',
  commands: [instancesCommands],
  elements: {
    instancesTable: {
      selector: 'div[id=instances]'
    },
    fab: {
      selector: '.synicon-plus'
    },
    createModalNameInput: {
      selector: 'input[name=name]'
    },
    createModalDescriptionInput: {
      selector: 'input[name=description]'
    },
    confirmButton: {
      selector: 'button span[data-reactid*="$confirm"]'
    },
    confirmDeleteButton: {
      selector: 'button[data-reactid*="$deleteInstanceDialog"] + button'
    },
    instancesTableRow: {
      selector: 'div#instances div.row div.col-flex-1'
    },
    selectInstance: {
      selector: '.col-xs-10 span'
    },
    editButton: {
      selector: '.synicon-pencil'
    },
    deleteButton: {
      selector: '.synicon-delete'
    },
    instancesTableRowDescription: {
      selector: '.row .col-flex-1'
    },
    addInstanceModalTitle: {
      selector: '//h3[text()="Create an Instance"]',
      locateStrategy: 'xpath'
    },
    editInstanceModalTitle: {
      selector: '//h3[text()="Update an Instance"]',
      locateStrategy: 'xpath'
    },
    deleteInstanceModalTitle: {
      selector: '//h3[text()="Delete an Instance"]',
      locateStrategy: 'xpath'
    }
  }
};
