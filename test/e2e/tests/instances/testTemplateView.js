import utils from '../../utils';
import accounts from '../../tempAccounts';

module.exports = {
  tags: ['templateView'],
  before(client) {
    const loginPage = client.page.loginPage();

    loginPage
      .navigate()
      .setResolution(client)
      .login(accounts.alternativeUser.email, accounts.alternativeUser.password);
  },
  after(client) {
    client.end();
  },
  'Test Admin Edits and Saves Template Code': (client) => {
    const listsPage = client.page.listsPage();
    const templateViewPage = client.page.templateViewPage();
    const codeText = utils.addSuffix('template');

    client.url('https://localhost:8080/#/instances/' + accounts.alternativeUser.instanceName + '/templates');

    // listsPoTage.goUrl('', 'templates');
    templateViewPage
      .clickElement('@htmlTestTemplateRow')
      .waitForElementPresent('@codeEditor')
      .clearInput('@codeEditorContent')
      .setValue('@codeEditor', codeText)
      .verify.containsText('@codeEditorContent', codeText)
      .clickElement('@saveButton');

    // listsPage.goToUrl('', 'templates');
    templateViewPage
      .clickElement('@htmlTestTemplateRow')
      .waitForElementPresent('@codeEditor');
    templateViewPage.verify.containsText('@codeEditorContent', codeText);
  },
  'Test Admin Renders Template Using Data Url and Context': (client) => {
    const listsPage = client.page.listsPage();
    const templateViewPage = client.page.templateViewPage();
    const controlTimestamp = utils.addSuffix('template');
    const dataSourceUrl = `https://api.syncano.rocks/v1.1/instances/${accounts.alternativeUser.instanceName}/classes/user_profile/objects/`;
    const expectedPreviewResult = `${controlTimestamp},channel_room,group,links`;

    // listsPage.goToUrl('', 'templates');
    templateViewPage
      .clickElement('@htmlTestTemplateRow')
      .waitForElementPresent('@codeEditor')
      .clearInput('@codeEditorContent')
      .setValue('@codeEditor', utils.jinjaTemplate())
      .fillInput('@inputDataSourceUrl', dataSourceUrl)
      .clearInput('@contextEditorContent')
      .setValue('@contextEditor', `{"timestamp": "${controlTimestamp}"}`)
      .clickElement('@saveButton')
      .clickElement('@renderButton')
      .verify.containsText('@previewEditorContent', expectedPreviewResult);
  },
  'Test Admin Renders Template in Tab': (client) => {
    const listsPage = client.page.listsPage();
    const templateViewPage = client.page.templateViewPage();
    const dataSourceUrl = `https://api.syncano.rocks/v1.1/instances/${accounts.alternativeUser.instanceName}/classes/user_profile/objects/`;
    const controlTimestamp = utils.addSuffix('template');
    const expectedTabResult = `${controlTimestamp},channel_room,group,links`;

    // listsPage.goToUrl('', 'templates');
    templateViewPage
      .clickElement('@htmlTestTemplateRow')
      .waitForElementPresent('@codeEditor')
      .fillInput('@inputDataSourceUrl', dataSourceUrl)
      .clearInput('@contextEditorContent')
      .setValue('@contextEditor', `{"timestamp": "${controlTimestamp}"}`)
      .clickElement('@saveButton')
      .clickElement('@renderInTabButton');

    client
      .windowHandles((result) => {
        const handle = result.value[1];

        client.assert.equal(result.value.length, 2, 'There should be two tabs open.');
        client.switchWindow(handle);
      })
      .waitForElementPresent('body')
      .verify.containsText('body', expectedTabResult);
  }
};
