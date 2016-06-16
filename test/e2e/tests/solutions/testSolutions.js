import accounts from '../../tempAccounts';

export default {
  tags: ['solutions'],
  beforeEach(client) {
    const loginPage = client.page.loginPage();

    loginPage
      .navigate()
      .setResolution(client)
      .login(accounts.navigationUser.email, accounts.navigationUser.password);
  },
  afterEach(client, done) {
    client.end(done);
  },
  'Administrator can view Favorite Solutions': (client) => {
    const solutionsPage = client.page.solutionsPage();

    solutionsPage
      .navigate()
      .clickElement('@favorite')
      .waitForElementVisible('@favoriteSolutionTitle');
  },
  // 'Administrator can view his Solutions': (client) => {
  //   const solutionsPage = client.page.solutionsPage();

  //   solutionsPage
  //     .navigate()
  //     .clickElement('@mySolutions')
  //     .waitForElementVisible('@mySolutionTitle');
  // },
  'Administrator can filter solutions by tags': (client) => {
    const solutionsPage = client.page.solutionsPage();
    const elementsWithTag = solutionsPage.elements.tagsJs;

    solutionsPage
      .navigate()
      .waitForElementVisible('@tagsList')
      .clickElement('@allSolutions')
      .clickElement('@tagsListJs')
      .waitForElementVisible('@tagsJs');

    client.elements(elementsWithTag.locateStrategy, elementsWithTag.selector, (result) => {
      if (result.value.length >= 2) {
        client.assert.ok(true, 'Count is equal or greater than two solutions on the list');
      }
    });
  }
};
