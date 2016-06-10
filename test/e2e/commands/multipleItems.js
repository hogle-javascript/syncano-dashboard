exports.command = function multipleItems(action, assertionCount, optionsMenu, selectedItems) {
  return this
    .useXpath()
    .clickListItemDropdown(optionsMenu, action)
    .assertSelectedCount('xpath', selectedItems, assertionCount);
};
