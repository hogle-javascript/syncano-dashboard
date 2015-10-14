const utils = require('../utils');
let url = null;

module.exports = {
  tags: ['classes'],
  before(client) {
    const signupPage = client.page.signupPage();
    const instancesPage = client.page.instancesPage();
    const leftMenuPage = client.page.leftMenuPage();
    const slug = Date.now();

    signupPage.navigate();
    signupPage.setValue('@emailInput', 'syncano.bot+' + slug + '@syncano.com');
    signupPage.setValue('@passInput', slug);
    signupPage.clickSubmitButton();

    instancesPage.navigate();
    instancesPage.waitForElementPresent('@emptyListItem');
    instancesPage.clickButton('@welcomeDialogCreateInstance');
    instancesPage.clickButton('@confirmButton');
    instancesPage.isModalClosed('@addInstanceModalTitle');

    client.element('xpath', instancesPage.elements.instancesTableName.selector, function(result) {
      const elementId = result.value.ELEMENT.toString();

      client.pause(500);
      client.elementIdText(elementId, function(text) {
        url = 'https://localhost:8080/#/instances/' + text.value + '/classes/';
      });
    });
    instancesPage.clickButton('@instancesTableName');
    leftMenuPage.clickButton('@classes');
  },
  after(client) {
    client.end();
  },
  'Test Add Multiple Classes': function addClass(client) {
    let className = utils.addSuffix('class');
    const classesPage = client.page.classesPage();
    let i = 0;

    classesPage.waitForElementVisible('@userProfileClassName')

    for (i; i < 2; i += 1) {
      className += i.toString();
      classesPage.clickButton('@fab');
      classesPage.fillInputField('@createModalNameInput', className);
      classesPage.fillInputField('@createModalDescriptionInput', 'nightwatch_test_class_description');
      classesPage.fillInputField('@createModalFieldNameInput', 'schemaName');
      classesPage.selectFromDropdown('@createModalDropdownType', '@createModalSchemaString');
      classesPage.clickButton('@addButton');
      client.pause(1000);
      classesPage.waitForElementVisible('@addClassTitle');
      classesPage.clickButton('@confirmButton');
      classesPage.waitForElementNotVisible('@addClassTitle');

      classesPage.waitForElementVisible('@classTableRow');
    }
  }
};
