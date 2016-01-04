exports.command = function fillInput(element, string) {
  this
    .waitForElementVisible(element)
    .clearValue(element)
    .setValue(element, string)
    .pause(1000);

  return this;
};
