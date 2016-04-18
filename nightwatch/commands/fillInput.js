exports.command = function fillInput(element, string) {
  this
    .waitForElementVisible(element)
    .clearValue(element)
    .pause(1000)
    .setValue(element, string)
    .pause(1000);

  return this;
};
