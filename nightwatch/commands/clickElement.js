exports.command = function clickElement(element) {
  this
    .waitForElementPresent(element)
    .click(element)
    .pause(1000);

  return this;
};
