var CheckListStoreMixin = {

  getNumberOfChecked: function() {
    var checkedFilter = function(item) {
      return item.checked === true;
    };
    return this.data.items.filter(checkedFilter).length;
  },

  onCheckItem: function(checkId, state) {

    console.log(checkId, state)
    this.data.items.forEach(function(item) {
      if (checkId == item.id) {
        item.checked = state;
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
    return this.data.items.filter(function (item) {
      return item.checked;
    });
  },

};

module.exports = CheckListStoreMixin;