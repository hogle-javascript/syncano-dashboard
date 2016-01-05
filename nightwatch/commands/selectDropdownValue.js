exports.command = function selectDropdownValue(element, dropdownValue) {
  const value = `//iframe//following-sibling::div//div[text()="${dropdownValue}"]`;

  this
    .waitForElementVisible(element)
    .click(element)
    .pause(1000)
    .waitForElementVisible(value)
    .click(value)
    .pause(1000);

  return this;
};
