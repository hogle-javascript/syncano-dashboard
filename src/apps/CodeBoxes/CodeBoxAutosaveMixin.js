import _ from 'lodash';

export default {

  autosaveTimer: null,

  componentWillMount() {
    if (!_.has(localStorage, this.getAutosaveConfigName())) {
      localStorage.setItem(this.getAutosaveConfigName(), true)
    }
  },

  componentWillUnmount() {
    this.clearAutosaveTimer();
  },

  getInitialState() {
    return {
      autosaveTimer: null
    }
  },

  isAutosaveEnabled() {
    if (this.isActive('codebox-edit')) {
      return JSON.parse(localStorage.getItem('codeBoxSourceAutosave'))
    }

    return JSON.parse(localStorage.getItem('codeBoxConfigAutosave'))
  },

  getAutosaveConfigName() {
    if (this.isActive('codebox-edit')) {
      return 'codeBoxSourceAutosave'
    }

    return 'codeBoxConfigAutosave'
  },

  saveCheckboxState(event, checked) {
    localStorage.setItem(this.getAutosaveConfigName(), checked);
  },

  runAutoSave() {
    if (!this.isSaved() && this.refs.autosaveCheckbox && this.refs.autosaveCheckbox.isChecked()) {
      this.clearAutosaveTimer();
      this.autosaveTimer = setTimeout(this.handleUpdate, 3000);
    } else {
      this.clearAutosaveTimer();
    }
  },

  clearAutosaveTimer() {
    clearTimeout(this.autosaveTimer);
  }
};
