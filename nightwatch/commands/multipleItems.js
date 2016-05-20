exports.command = function multipleItems(action, assertionCount, optionsMenu, selectedItems) {
  this
    .useXpath()
    .clickListItemDropdown(optionsMenu, action)
    .assertSelectedCount('xpath', selectedItems, assertionCount);

  return this;
};
