exports.command = function(element, dropdownChoice) {
  let choice = null;

  switch (dropdownChoice) {
    case 'delete':
      choice = '//div[contains(text(), "Delete")]';
      break;
    case 'select':
      choice = '//div[contains(text(), "Select")]';
      break;
    case 'unselect':
      choice = '//div[contains(text(), "Unselect")]';
      break;
    case 'edit':
      choice = '//div[contains(text(), "Edit")]';
      break;
    case 'customize':
      choice = '//div[contains(text(), "Customize")]';
      break;
  }
  this
    // .useXpath()
    .waitForElementVisible(element)
    .click(element)
    .waitForElementNotPresent('//span[@class="synicon-dots-vertical"]/preceding-sibling::span/div')
    .click(choice)
    .waitForElementNotPresent('//iframe/following-sibling::div/div');

  return this;
};
