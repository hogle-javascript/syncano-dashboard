export default {

  getNumberOfChecked() {
    if (this.data.items === null) {
      return 0;
    }

    let checkedFilter = (item) => item.checked === true;

    return this.data.items.filter(checkedFilter).length;
  },

  onCheckItem(checkId, state) {
    console.debug('CheckListStoreMixin::onCheckItem');
    this.data.items.forEach((item) => {
      if (item.id) {
        if (checkId.toString() === item.id.toString()) {
          item.checked = state;
        }
      } else if (checkId.toString() === item.name) {
        item.checked = state;
      }
    });
    this.trigger(this.data);
  },

  onUncheckAll() {
    this.data.items.forEach((item) => item.checked = false);
    this.trigger(this.data);
  },

  onSelectAll() {
    this.data.items.forEach((item) => item.checked = true);
    this.trigger(this.data);
  },

  getCheckedItem() {
    // Looking for the first 'checked' item
    let checkedItem = null;

    if (this.data.items === null) {
      return checkedItem;
    }

    this.data.items.some((item) => {
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

    return this.data.items.filter((item) => item.checked);
  }
};
