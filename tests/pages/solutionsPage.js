const solutionsCommands = {
  clickButton: function(button) {
    return this.waitForElementVisible(button)
      .click(button);
  }
};

module.exports = {
  url: 'https://localhost:8080/#/solutions/list',
  commands: [solutionsCommands],
  elements: {
    solutionsView: {
      selector: 'div#solutions'
    },
    solutionDetails: {
      selector: '//button//span[text()="SEE DETAILS"]',
      locateStrategy: 'xpath'
    },
    favorite: {
      selector: '//div[@class="vm-6-b"]//div[text()="Favorite"]',
      locateStrategy: 'xpath'
    },
    mySolutions: {
      selector: '//div[@class="vm-6-b"]//div[text()="My solutions"]',
      locateStrategy: 'xpath'
    },
    favoriteSolutionTitle: {
      selector: '//div[@title="SlackNotifications"]',
      locateStrategy: 'xpath'
    },
    mySolutionTitle: {
      selector: '//div[@title="my solution"]',
      locateStrategy: 'xpath'
    },
    tagsList: {
      selector: '//div[@class="tags-list"]',
      locateStrategy: 'xpath'
    },
    tagsListItem: {
      selector: '//div[@class="tags-list"]//div[text()="js"]',
      locateStrategy: 'xpath'
    },
    tagListItemCount: {
      selector: '//div[@class="tags-list"]//div[text()="js"]/preceding-sibling::div',
      locateStrategy: 'xpath'
    },
    tagsListJs: {
      selector: '//div[@class="tags-list"]//div[text()="js"]',
      locateStrategy: 'xpath'
    },
    tagsJs: {
      selector: '//span[@class="synicon-tag"]/following-sibling::a[text()="js"]',
      locateStrategy: 'xpath'
    }
  }
};
