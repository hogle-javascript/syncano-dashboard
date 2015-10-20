const utils = require('../utils');

export default {
  tags: ['classes'],
  before(client) {
    const signupPage = client.page.signupPage();
    const instancesPage = client.page.instancesPage();
    const leftMenuPage = client.page.leftMenuPage();
    const slug = Date.now();

    signupPage
      .navigate()
      .setValue('@emailInput', 'syncano.bot+' + slug + '@syncano.com')
      .setValue('@passInput', slug)
      .clickSubmitButton();

    instancesPage
      .navigate()
      .waitForElementPresent('@emptyListItem')
      .clickButton('@welcomeDialogCreateInstance')
      .clickButton('@confirmButton')
      .isModalClosed('@addInstanceModalTitle')
      .clickButton('@instancesTableRow');

    leftMenuPage.clickButton('@classes');
    client.pause(1000);
  },
  after(client) {
    client.end();
  },
  'Test Add Multiple Classes': (client) => {
    let className = utils.addSuffix('class');
    const classesPage = client.page.classesPage();
    let i = 0;

    for (i; i < 2; i += 1) {
      className += '_' + i.toString();
      classesPage
        .clickButton('@fab')
        .fillInputField('@createModalNameInput', className)
        .fillInputField('@createModalFieldNameInput', 'schemaName')
        .selectFromDropdown('@createModalDropdownType', '@createModalSchemaString')
        .clickButton('@addButton');
      client.pause(1000);
      classesPage
        .waitForElementVisible('@addClassTitle')
        .clickButton('@confirmButton')
        .waitForElementNotVisible('@addClassTitle');
    }
  },
  'Test Select/Delete multiple Classes': (client) => {
    const classesPage = client.page.classesPage();

    classesPage
      .clickButton('@selectUserClass')
      .clickButton('@multipleSelectButton')
      .clickButton('@selectUserClass');
    client.pause(1000);
    classesPage.clickButton('@deleteButton');
    client.pause(1000);
    classesPage
      .clickButton('@confirmDeleteButton')
      .waitForElementNotVisible('@deleteClassModalTitle');
    const classTableRows = classesPage.elements.classTableRows.selector;

    client.elements('xpath', classTableRows, function(result) {
      client.assert.equal(result.value.length, 1);
    });
  }
};
