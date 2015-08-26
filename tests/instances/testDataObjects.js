const utils = require('../utils');

module.exports = {
  tags: ['dataObjects'],
  before: function(client) {
    const loginPage = client.page.loginPage();

    loginPage.goToLoginPage();
    loginPage.typeEmail();
    loginPage.typePassword();
    loginPage.clickSignInButton();
    loginPage.verifyLoginSuccessful();
  },
  after: function(client) {
    client.end();
  },
  'Administrator adds a Data Object' : function(client) {
    const dataObjectsPage = client.page.dataObjectsPage();
    const string = utils.addSuffix('string');

    dataObjectsPage.navigate();
    dataObjectsPage.clickButton('@addDataObjectButton');
    dataObjectsPage.fillInputField('@stringField', string);
    dataObjectsPage.clickButton('@confirm');
    dataObjectsPage.waitForElementVisible('@stringFieldTableRow');
  },
  'Administrator edits a Data Object' : function(client) {
    const dataObjectsPage = client.page.dataObjectsPage();
    const edited = utils.addSuffix('string') + 'edited';

    console.log(edited)
    dataObjectsPage.navigate();
    dataObjectsPage.clickButton('@stringFieldTableRow');
    dataObjectsPage.fillInputField('@stringField', edited);
    dataObjectsPage.clickButton('@confirm');
    dataObjectsPage.waitForElementVisible('@stringFieldEditedTableRow');
  },
  'Administrator deletes a Data Object' : function(client) {
    const dataObjectsPage = client.page.dataObjectsPage();

    dataObjectsPage.navigate();
    dataObjectsPage.waitForElementVisible('@stringFieldEditedTableRow')
    dataObjectsPage.clickCheckbox('@selectDataObjectTableRow');
    dataObjectsPage.clickButton('@deleteDataObjectButton');
    client.pause(1000);
    dataObjectsPage.clickButton('@confirm');
    dataObjectsPage.waitForElementNotVisible('@selectDataObjectTableRow');
  }
}
