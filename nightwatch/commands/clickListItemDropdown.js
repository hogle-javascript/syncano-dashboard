// 'element' is the element to click in order to open the dropdown
// 'dropdoownChoice' can be part of the name of the dropdown option like "Edit" or "Delete"

exports.command = function(element, dropdownChoice) {
  const choice = `//div[contains(text(), "${dropdownChoice}")]`;

  this
    .waitForElementVisible(element)
    .click(element)
    // Waiting for the dropdown click animation to finish
    .waitForElementNotPresent('//span[@class="synicon-dots-vertical"]/preceding-sibling::span/div')
    .click(choice)
    // Waiting for dropdown to be removed from DOM
    .waitForElementNotPresent('//iframe/following-sibling::div[@style]/div')
    .pause(1000);

  return this;
};
