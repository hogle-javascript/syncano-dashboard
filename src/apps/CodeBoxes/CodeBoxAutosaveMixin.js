import _ from 'lodash';

export default {

  autosaveTimer: null,

  componentWillMount() {
    if (!this.autosaveAttributeName) {
      throw Error("Missing attribute: 'autosaveAttributeName'");
    }
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
    return JSON.parse(localStorage.getItem(this.getAutosaveConfigName()));
  },

  getAutosaveConfigName() {
    return this.autosaveAttributeName;
  },

  saveCheckboxState(event, checked) {
    localStorage.setItem(this.getAutosaveConfigName(), checked);
  },

  runAutoSave() {
    if (!this.isSaved() && this.refs.autosaveCheckbox && this.refs.autosaveCheckbox.isChecked()) {
      this.clearAutosaveTimer();
      this.setAutosaveTimer();
    } else {
      this.clearAutosaveTimer();
    }
  },

  clearAutosaveTimer() {
    clearTimeout(this.autosaveTimer);
  },

  setAutosaveTimer() {
    this.autosaveTimer = setTimeout(this.handleUpdate, 3000);
  }
};
