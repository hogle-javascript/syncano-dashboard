// 'element' is the element to click in order to open the dropdown
// 'dropdoownChoice' can be either 'select' or 'unselect'

exports.command = function(element, dropdownChoice) {
  let choice = null;

  switch (dropdownChoice) {
    case 'select':
      choice = '//div[contains(text(), "Select")]';
      break;
    case 'unselect':
      choice = '//div[contains(text(), "Unselect")]';
      break;
  }
  this
    .waitForElementVisible(element)
    .click(element)
    .waitForElementNotPresent('//span[@class="synicon-dots-vertical"]/preceding-sibling::span/div')
    .click(choice)
    // Waiting for drodown to be removed from DOM
    .waitForElementNotPresent('//iframe/following-sibling::div/div');

  return this;
};
