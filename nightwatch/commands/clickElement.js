exports.command = function clickElement(element) {
  this
    .waitForElementPresent(element)
    .moveToElement(element, 0, 0)
    .click(element)
    .pause(500);

  return this;
};
