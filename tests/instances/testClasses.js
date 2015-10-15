const utils = require('../utils');

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

    instancesPage.clickButton('@instancesTableRow');
    leftMenuPage.clickButton('@classes');
    client.pause(1000);
  },
  after(client) {
    client.end();
  },
  'Test Add Multiple Classes': function addClasses(client) {
    let className = utils.addSuffix('class');
    const classesPage = client.page.classesPage();
    let i = 0;

    for (i; i < 2; i += 1) {
      className += '_' + i.toString();
      classesPage.clickButton('@fab');
      classesPage.fillInputField('@createModalNameInput', className);
      classesPage.fillInputField('@createModalFieldNameInput', 'schemaName');
      classesPage.selectFromDropdown('@createModalDropdownType', '@createModalSchemaString');
      classesPage.clickButton('@addButton');
      client.pause(1000);
      classesPage.waitForElementVisible('@addClassTitle');
      classesPage.clickButton('@confirmButton');
      classesPage.waitForElementNotVisible('@addClassTitle');
    }
  },
  'Test Select/Delete multiple Classes': function deleteClasses(client) {
    const classesPage = client.page.classesPage();

    classesPage.clickButton('@selectUserClass');
    classesPage.clickButton('@multipleSelectButton');
    classesPage.clickButton('@selectUserClass');
    client.pause(1000);
    classesPage.clickButton('@deleteButton');
    client.pause(1000);
    classesPage.clickButton('@confirmDeleteButton');
    classesPage.waitForElementNotVisible('@deleteClassModalTitle');
    const classTableRows = classesPage.elements.classTableRows.selector;

    client.elements('xpath', classTableRows, function(result) {
      client.assert.equal(result.value.length, 1);
    });
  }
};
