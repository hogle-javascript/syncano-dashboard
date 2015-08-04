export default {

  getNumberOfChecked() {
    if (this.data.items === null) {
      return 0;
    }

    let checkedFilter = function(item) {
      return item.checked === true;
    };
    return this.data.items.filter(checkedFilter).length;
  },

  onCheckItem(checkId, state) {
    console.debug('CheckListStoreMixin::onCheckItem');
    checkId = checkId.toString();

    this.data.items.forEach(function(item) {
      // TODO: If item don't have id we are checking name, we should consider name->id in js lib
      if (item.id) {
        if (checkId === item.id.toString()) {
          item.checked = state;
        }
      } else if (checkId === item.name) {
        item.checked = state;
      }
    }.bind(this));
    this.trigger(this.data);
  },

  onUncheckAll() {

    this.data.items.forEach(function(item) {
      item.checked = false;
    });
    this.trigger(this.data);
  },

  onSelectAll() {
    this.data.items.forEach(function(item) {
      item.checked = true;
    });
    this.trigger(this.data);
  },

  getCheckedItem() {
    // Looking for the first 'checked' item
    let checkedItem = null;
    if (this.data.items === null) {
      return checkedItem;
    }

    this.data.items.some(function(item) {
      if (item.checked) {
        checkedItem = item;
        return true;
      }
    });
    return checkedItem;
  },

  getCheckedItems() {
    if (this.data.items === null) {
      return [];
    }

    return this.data.items.filter(function(item) {
      return item.checked;
    });
  },

};
