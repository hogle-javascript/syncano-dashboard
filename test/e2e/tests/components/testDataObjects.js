import accounts from '../../tempAccounts';
import utils, { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['dataObjects'],
  before(client) {
    const loginPage = client.page.loginPage();
    const { email, password } = accounts.alternativeUser;

    loginPage
      .navigate()
      .setResolution(client)
      .login(email, password);
  },
  after(client) {
    client.end();
  },
  'Administrator adds a Data Object'(client) {
    const dataObjectsPage = client.page.dataObjectsPage();
    const string = utils.addSuffix('string');
    const { instanceName } = accounts.alternativeUser;
    const tempClassName = accounts.alternativeUser.tempClassNames[0];

    dataObjectsPage
      .goToUrl(instanceName, `classes/${tempClassName}/objects`)
      .clickElement('@addDataObjectButton')
      .fillInput('@stringField', string)
      .clickElement('@confirm')
      .waitForElementVisible('@stringFieldTableRow');
  }
  // 'Administrator edits a Data Object'(client) {
  //   const dataObjectsPage = client.page.dataObjectsPage();
  //   const edited = utils.addSuffix('edited');
  //   const instanceName = accounts.alternativeUser.instanceName;
  //   const tempClassName = accounts.alternativeUser.tempClassNames[0];
  //
  //   dataObjectsPage
  //     .goToUrl(instanceName, `/classes/${tempClassName}/objects`)
  //     .clickElement('@stringFieldTableRow')
  //     .fillInput('@stringField', edited)
  //     .clickElement('@confirm')
  //     .waitForElementVisible('@stringFieldEditedTableRow');
  // },
  // 'Administrator deletes a Data Object'(client) {
  //   const dataObjectsPage = client.page.dataObjectsPage();
  //   const instanceName = accounts.alternativeUser.instanceName;
  //   const tempClassName = accounts.alternativeUser.tempClassNames[0];
  //
  //   dataObjectsPage
  //     .goToUrl(instanceName, `/classes/${tempClassName}/objects`)
  //     .waitForElementPresent('@stringFieldEditedTableRow')
  //     .clickElement('@selectDataObjectTableRow')
  //     .waitForElementNotPresent('@deleteDataObjectButtonDisabled')
  //     .clickElement('@deleteDataObjectButton')
  //     .clickElement('@confirm')
  //     .waitForElementNotPresent('@selectDataObjectTableRow');
  // }
});
