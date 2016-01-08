exports.command = function clickElement(element) {
  this
    .waitForElementPresent(element)
    .waitForElementVisible(element)
    .click(element)
    .pause(1000);

  return this;
};
