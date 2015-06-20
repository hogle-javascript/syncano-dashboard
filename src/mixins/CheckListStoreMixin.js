var CheckListStoreMixin = {

  getNumberOfChecked: function() {
    var checkedFilter = function(item) {
      return item.checked === true;
    };
    return this.data.items.filter(checkedFilter).length;
  },

  onCheckItem: function(checkId, state) {
    console.debug('CheckListStoreMixin::onCheckItem');

    this.data.items.forEach(function(item) {
      // TODO: If item don't have id we are checking name, we should consider name->id in js lib
      if (item.id) {
        if (checkId == item.id) {
          item.checked = state;
        }
      } else {
        if (checkId == item.name) {
          item.checked = state;
        }
      }
    }.bind(this));
    this.trigger(this.data);
  },

  onUncheckAll: function() {

    this.data.items.forEach(function(item) {
        item.checked = false;
    });
    this.trigger(this.data);
  },

  getCheckedItem: function() {

    // Looking for the first 'checked' item
    var checkedItem = null;
    this.data.items.some(function (item) {
      if (item.checked) {
        checkedItem = item;
        return true;
      }
    });
    return checkedItem;
  },

  getCheckedItems: function() {
    // Looking for the first 'checked' item
    var checkedItems = [];
    this.data.items.map(function (item) {
      if (item.checked) {
        checkedItems.push(item);
      }
    });
    return checkedItems;
  },

};

module.exports = CheckListStoreMixin;