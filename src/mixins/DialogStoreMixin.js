var objectAssign = require('object-assign');

var DialogStoreMixin = {

  getInitialState: function() {
    return this.getInitialDialogState();
  },

  getInitialDialogState: function() {
    return {
      _dialogMode    : 'add',
      _dialogVisible : false
    }
  },

  showDialog: function(instance, secondInstance) {
    console.debug('DialogStoreMixin::showDialog');
    var state = {_dialogVisible: true};

    if (instance !== undefined) {
      state = objectAssign(state, instance, {_dialogMode: 'edit'});
    } else if (secondInstance !== undefined) {
      state = objectAssign(state, {secondInstance: secondInstance});
    }

    this.trigger(state);
  },

  dismissDialog: function() {
    console.debug('DialogStoreMixin::dismissDialog');
    this.trigger(this.getInitialDialogState());
  }
};

module.exports = DialogStoreMixin;
