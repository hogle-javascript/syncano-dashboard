import utils from '../../utils';

export default {
  tags: ['dataObjects'],
  before(client) {
    const loginPage = client.page.loginPage();

    loginPage
      .navigate()
      .login(process.env.NIGHTWATCH_EMAIL, process.env.NIGHTWATCH_PASSWORD);
  },
  after(client) {
    client.end();
  },
  'Administrator adds a Data Object'(client) {
    const dataObjectsPage = client.page.dataObjectsPage();
    const string = utils.addSuffix('string');

    dataObjectsPage.navigate();
    dataObjectsPage.clickButton('@addDataObjectButton', client);
    dataObjectsPage.fillInputField('@stringField', string, client);
    dataObjectsPage.clickButton('@confirm', client);
    dataObjectsPage.waitForElementVisible('@stringFieldTableRow');
  },
  'Administrator edits a Data Object'(client) {
    const dataObjectsPage = client.page.dataObjectsPage();
    const edited = utils.addSuffix('edited');

    dataObjectsPage.navigate();
    dataObjectsPage.clickButton('@stringFieldTableRow', client);
    dataObjectsPage.fillInputField('@stringField', edited, client);
    dataObjectsPage.clickButton('@confirm', client);
    dataObjectsPage.waitForElementVisible('@stringFieldEditedTableRow');
  },
  'Administrator deletes a Data Object'(client) {
    const dataObjectsPage = client.page.dataObjectsPage();

    dataObjectsPage.navigate();
    dataObjectsPage.waitForElementVisible('@stringFieldEditedTableRow');
    dataObjectsPage.clickButton('@selectDataObjectTableRow', client);
    dataObjectsPage.waitForElementNotPresent('@deleteDataObjectButtonDisabled');
    dataObjectsPage.clickButton('@deleteDataObjectButton', client);
    dataObjectsPage.clickButton('@confirm', client);
    dataObjectsPage.waitForElementNotPresent('@selectDataObjectTableRow');
  }
};
