let objectAssign = require('object-assign');

let DialogStoreMixin = {

  getInitialState() {
    return this.getInitialDialogState();
  },

  getInitialDialogState() {
    return {
      _dialogMode: 'add',
      _dialogVisible: false
    }
  },

  showDialog(instance, secondInstance) {
    console.debug('DialogStoreMixin::showDialog');
    let state = {_dialogVisible: true};

    if (instance !== undefined) {
      state = objectAssign(state, instance, {_dialogMode: 'edit'});
    } else if (secondInstance !== undefined) {
      state = objectAssign(state, {secondInstance: secondInstance});
    }

    this.trigger(state);
  },

  dismissDialog() {
    console.debug('DialogStoreMixin::dismissDialog');
    this.trigger(this.getInitialDialogState());
  }
};

module.exports = DialogStoreMixin;
