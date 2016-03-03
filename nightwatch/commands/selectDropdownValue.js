exports.command = function selectDropdownValue(element, dropdownValue) {
  const value = `//iframe//following-sibling::div//div[text()="${dropdownValue}"]`;

  this
    .waitForElementVisible(element)
    .moveToElement(element, 0, 0)
    .pause(100)
    .mouseButtonClick()
    .waitForElementVisible(value)
    .click(value)
    .pause(1000);

  return this;
};
