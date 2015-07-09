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
  fillInstanceDescription: function() {
    return this.waitForElementVisible('@createModalDescriptionInput', 1000)
      .setValue('@createModalDescriptionInput', 'nightwatch_test_instance_description');
  },
  clickConfirmButton: function() {
    return this.waitForElementVisible('@confirmButton', 1000)
      .click('@confirmButton')
      .waitForElementNotVisible('@confirmButton', 5000)
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
    instancesTableFirstInstanceName: {
      selector: '.row .col-xs-10 div'
    }
  }
};
