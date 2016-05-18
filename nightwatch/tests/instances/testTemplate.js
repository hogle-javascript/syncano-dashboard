import Async from 'async';
import globals from '../../globals';
import utils from '../../utils';

export default {
  tags: ['template'],
  after(client) {
    client.end();
  },
  before(client) {
    Async.waterfall([
      client.createTempAccount,
      client.createTempInstance
    ], (err) => {
      if (err) throw err;
      const loginPage = client.page.loginPage();

      loginPage
        .navigate()
        .login(globals.tempEmail, globals.tempPass);
    });
  },
  'Test Add Template': (client) => {
    const listsPage = client.page.listsPage();
    const templateName = utils.addSuffix('template');

    listsPage
      .goToUrl('temp', 'templates')
      .clickElement('@addButton')
      .fillInput('@inputName', templateName)
      .fillInput('@inputContentType', 'text/csv')
      .clickElement('@confirmButton')
      .waitForElementNotPresent('@addTitleHeading')
      .verify.containsText('@firstItemRowName', templateName);
  },
  'Test Edit Template': (client) => {
    const listsPage = client.page.listsPage();

    listsPage
      .goToUrl('temp', 'templates')
      .waitForElementVisible('@firstItemOptionsMenu')
      .clickListItemDropdown('@firstItemOptionsMenu', 'Edit')
      .fillInput('@inputContentType', 'text/html')
      .clickElement('@confirmButton')
      .waitForElementVisible('@firstItemRowDescription')
      .verify.containsText('@firstItemRowDescription', 'text/html');
  },
  'Test Delete Template': (client) => {
    const listsPage = client.page.listsPage();

    listsPage
      .goToUrl('temp', 'templates')
      .waitForElementVisible('@firstItemOptionsMenu')
      .clickListItemDropdown('@firstItemOptionsMenu', 'Delete')
      .waitForElementVisible('@deleteTitleHeading')
      .clickElement('@confirmButton')
      .waitForElementNotPresent('@deleteTitleHeading')
      .verify.containsText('@firstItemRowName', 'objects_csv');
  }
  // 'Test Admin Selects/Deselects Template': (client) => {
  //   const listsPage = client.page.listsPage();
  //
  //   listsPage
  //     .goToUrl('temp', 'templates')
  //     .waitForElementVisible('@firstItemCheckbox');
  //     .moveToElement('@firstItemCheckbox', 0, 0)
  //     .clickElement('@highlightedCheckbox')
  //     .waitForElementVisible('@selectedItem')
  //     .clickElement('@selectedItem')
  //     .waitForElementVisible('@firstItemCheckbox');
  // }
};
