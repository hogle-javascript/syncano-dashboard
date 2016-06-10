exports.command = function selectDropdownValue(element, dropdownValue) {
  const value = `//iframe//following-sibling::div//div[text()="${dropdownValue}"]`;

  return this
    .waitForElementVisible(element)
    .moveToElement(element, 0, 0)
    .pause(500)
    .mouseButtonClick()
    .waitForElementVisible(value)
    .pause(500)
    .click(value)
    .pause(500);
};
