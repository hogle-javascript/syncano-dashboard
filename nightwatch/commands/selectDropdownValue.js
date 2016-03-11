exports.command = function selectDropdownValue(element, dropdownValue) {
  const value = `//iframe//following-sibling::div//div[text()="${dropdownValue}"]`;

  this
    .waitForElementVisible(element)
    .moveToElement(element, 0, 0)
    .pause(300)
    .mouseButtonClick()
    .waitForElementVisible(value)
    .pause(300)
    .click(value)
    .pause(500);

  return this;
};
