import Utils from '../utils';

exports.command = function fillInput(element, string) {
  const value = Utils.addSuffix(string);

  this
    .waitForElementVisible(element)
    .clearValue(element)
    .setValue(element, value)
    .pause(1000);

  return this;
};
