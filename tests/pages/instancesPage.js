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
  clickConfirmButton: function() {
    return this.waitForElementVisible('@confirmButton', 5000)
      .click('@confirmButton')
      .waitForElementNotVisible('@confirmButton', 5000)
  },
  clickSelectInstance: function() {
    return this.waitForElementVisible('@selectInstance', 5000)
      .click('@selectInstance')
  },
  clickEditButton: function() {
    return this.waitForElementVisible('@editButton', 5000)
      .click('@editButton')
  },
  clickDeleteButton: function() {
    return this.waitForElementVisible('@deleteButton', 5000)
      .click('@deleteButton')
  },
  clickButton: function(button) {
    return this.waitForElementVisible(button, 5000)
      .click(button)
  },
  wasInstanceDeleted: function() {
    return this. waitForElementNotPresent('@instancesTableRow', 5000)
  }
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
      selector: '.row .col-xs-10'
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
    }
  }
};
