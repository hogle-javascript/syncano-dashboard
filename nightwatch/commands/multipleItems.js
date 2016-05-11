exports.command = function multipleItems(action, assertionCount, optionsMenu, selectedItems) {
  this
    .useXpath()
    .waitForElementVisible(optionsMenu)
    .clickListItemDropdown(optionsMenu, action)
    .assertSelectedCount('xpath', selectedItems, assertionCount);

  return this;
};
