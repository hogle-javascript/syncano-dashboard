export default {

  timer: null,

  componentWillUpdate() {
    if (!this.getLocalStorageItem() && this.refs.autosaveCheckbox) {
      localStorage.setItem(this.getLocalStorageItemName(), this.refs.autosaveCheckbox.isChecked())
    }
  },

  componentWillUnmount() {
    clearTimeout(this.timer);
  },

  getInitialState() {
    return {
      timer: null
    }
  },

  getLocalStorageItem() {
    if (this.isActive('codebox-edit')) {
      return localStorage.getItem('codeBoxSourceAutosave')
    }

    return localStorage.getItem('codeBoxConfigAutosave')
  },

  getLocalStorageItemName() {
    if (this.isActive('codebox-edit')) {
      return 'codeBoxSourceAutosave'
    }

    return 'codeBoxConfigAutosave'
  },

  saveCheckboxState(event, checked) {
    localStorage.setItem(this.getLocalStorageItemName(), checked);
  },

  runAutoSave() {
    if (!this.isSaved() && this.refs.autosaveCheckbox && this.refs.autosaveCheckbox.isChecked()) {
      clearTimeout(this.timer);
      this.timer = setTimeout(this.handleUpdate, 3000)
    } else {
      clearTimeout(this.timer);
    }
  }
};
