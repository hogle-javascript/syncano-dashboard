import utils from '../../utils';

export default {
  tags: ['dataObjects'],
  before(client) {
    const loginPage = client.page.loginPage();

    loginPage
      .navigate()
      .typeEmail()
      .typePassword()
      .clickSignInButton()
      .verifyLoginSuccessful();
  },
  after(client) {
    client.end();
  },
  'Administrator adds a Data Object'(client) {
    const dataObjectsPage = client.page.dataObjectsPage();
    const string = utils.addSuffix('string');

    dataObjectsPage
      .navigate()
      .clickButton('@addDataObjectButton')
      .fillInputField('@stringField', string)
      .clickButton('@confirm')
      .waitForElementVisible('@stringFieldTableRow');
  },
  'Administrator edits a Data Object'(client) {
    const dataObjectsPage = client.page.dataObjectsPage();
    const edited = utils.addSuffix('edited');

    dataObjectsPage
      .navigate()
      .clickButton('@stringFieldTableRow');
    client.pause(1000);
    dataObjectsPage
      .fillInputField('@stringField', edited)
      .clickButton('@confirm')
      .waitForElementVisible('@stringFieldEditedTableRow');
  },
  'Administrator deletes a Data Object'(client) {
    const dataObjectsPage = client.page.dataObjectsPage();

    dataObjectsPage
      .navigate()
      .waitForElementVisible('@stringFieldEditedTableRow')
      .clickCheckbox('@selectDataObjectTableRow')
      .waitForElementNotPresent('@deleteDataObjectButtonDisabled')
      .clickButton('@deleteDataObjectButton');
    client.pause(1000);
    dataObjectsPage.clickButton('@confirm');
    client.pause(1000);
    dataObjectsPage.waitForElementNotVisible('@selectDataObjectTableRow');
  }
};
