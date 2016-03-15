import Utils from '../../utils';

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
    const string = Utils.addSuffix('string');

    dataObjectsPage
      .navigate()
      .clickElement('@addDataObjectButton')
      .fillInput('@stringField', string)
      .clickElement('@confirm')
      .waitForElementVisible('@stringFieldTableRow');
  },
  'Administrator edits a Data Object'(client) {
    const dataObjectsPage = client.page.dataObjectsPage();
    const edited = Utils.addSuffix('edited');

    dataObjectsPage
      .navigate()
      .clickElement('@stringFieldTableRow')
      .fillInput('@stringField', edited)
      .clickElement('@confirm')
      .waitForElementVisible('@stringFieldEditedTableRow');
  },
  'Administrator deletes a Data Object'(client) {
    const dataObjectsPage = client.page.dataObjectsPage();

    dataObjectsPage
      .navigate()
      .waitForElementPresent('@stringFieldEditedTableRow')
      .clickElement('@selectDataObjectTableRow')
      .waitForElementNotPresent('@deleteDataObjectButtonDisabled')
      .clickElement('@deleteDataObjectButton')
      .clickElement('@confirm')
      .waitForElementNotPresent('@selectDataObjectTableRow');
  }
};
