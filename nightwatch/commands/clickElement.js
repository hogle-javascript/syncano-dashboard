exports.command = function clickElement(element) {
  this
    .waitForElementPresent(element)
    .moveToElement(element, 0, 0)
    .click(element)
    .pause(1000);

  return this;
};
