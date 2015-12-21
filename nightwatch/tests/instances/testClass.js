import utils from '../../utils';

export default {
  tags: ['class'],
  before(client) {
    const loginPage = client.page.loginPage();

    loginPage
      .navigate()
      .login(process.env.NIGHTWATCH_EMAIL, process.env.NIGHTWATCH_PASSWORD);
  },
  after(client) {
    client.end();
  },
  'Test Add Class': (client) => {
    const className = utils.addSuffix('class');
    const classesPage = client.page.classesPage();

    classesPage.navigate();
    classesPage.clickButton('@addClassButton', client);
    classesPage.fillInputField('@createModalNameInput', className, client);
    classesPage.fillInputField('@createModalDescriptionInput', 'nightwatch_test_class_description', client);
    classesPage.fillInputField('@createModalFieldNameInput', 'schemaName', client);
    classesPage.selectFromDropdown('@createModalDropdownType', '@createModalSchemaString', client);
    classesPage.clickButton('@addButton', client);
    classesPage.waitForElementVisible('@addClassTitle');
    classesPage.clickButton('@confirmButton', client);
    classesPage.waitForElementNotVisible('@addClassTitle');
    classesPage.waitForElementVisible('@classTableRow');
    classesPage.verify.containsText('@classTableRowDescription', 'nightwatch_test_class_description');
  },
  'Test Edit Class': (client) => {
    const classesPage = client.page.classesPage();

    classesPage.clickDropdown('@classItemDropdown', client);
    classesPage.clickButton('@editDropdownItem', client);
    classesPage.waitForElementVisible('@createModalDescriptionInput';
    classesPage.fillInputField('@createModalDescriptionInput', 'nightwatch_test_class_new_description', client);
    classesPage.clickButton('@confirmButton', client);
    classesPage.waitForElementVisible('@classTableRowDescription');
    classesPage.verify.containsText('@classTableRowDescription', 'nightwatch_test_class_new_description');
  },
  'Test Delete Class': (client) => {
    const classesPage = client.page.classesPage();

    classesPage.clickDropdown('@classItemDropdown', client);
    classesPage.clickButton('@deleteDropdownItem', client);
    classesPage.waitForElementVisible('@deleteClassModalTitle');
    classesPage.clickButton('@confirmDeleteButton', client);
    classesPage.waitForElementNotVisible('@deleteClassModalTitle');
    classesPage.waitForElementNotPresent('@classTableName');
  },
  'Test Admin selects/deselects class': (client) => {
    const classesPage = client.page.classesPage();

    classesPage.moveToElement('@selectUserClass', 0, 0);
    classesPage.clickButton('@classToSelect', client);
    classesPage.clickButton('@checkboxSelected', client);
    classesPage.waitForElementVisible('@classToSelect');
  },
  'Test Admin cannot delete user_profile class': (client) => {
    const classesPage = client.page.classesPage();

    classesPage.clickDropdown('@userClassDropDown', client);
    classesPage.waitForElementVisible('@inactiveDeleteButton');

  // assert that Delete Class element is greyed out
    classesPage.assert.attributeContains('@inactiveDeleteButton', 'style', 'color: rgba(0, 0, 0, 0.298039)');
  }
};
