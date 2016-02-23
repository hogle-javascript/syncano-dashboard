import _ from 'lodash';

export default {

  autosaveTimer: null,

  componentWillMount() {
    if (!this.autosaveAttributeName) {
      throw Error("Missing attribute: 'autosaveAttributeName'");
    }
    if (!_.has(localStorage, this.autosaveAttributeName)) {
      localStorage.setItem(this.autosaveAttributeName, true);
    }
  },

  componentWillUnmount() {
    this.clearAutosaveTimer();
  },

  getInitialState() {
    return {
      autosaveTimer: null
    };
  },

  isAutosaveEnabled() {
    return JSON.parse(localStorage.getItem(this.autosaveAttributeName));
  },

  saveCheckboxState(event, checked) {
    localStorage.setItem(this.autosaveAttributeName, checked);
  },

  runAutoSave() {
    this.clearAutosaveTimer();
    if (!this.isSaved() && this.refs.autosaveCheckbox && this.refs.autosaveCheckbox.isChecked()) {
      this.setAutosaveTimer();
    }
  },

  clearAutosaveTimer() {
    clearTimeout(this.autosaveTimer);
  },

  setAutosaveTimer() {
    this.autosaveTimer = setTimeout(this.handleUpdate, 3000);
  }
};
