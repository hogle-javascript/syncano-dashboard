var objectAssign = require('object-assign');

var DialogStoreMixin = {

  getInitialState: function() {
    return this.getInitialDialogState();
  },

  getInitialDialogState: function() {
    return {
      mode    : 'add',
      visible : false
    }
  },

  showDialog: function(instance) {
    console.debug('DialogStoreMixin::showDialog');

    var state = {visible: true};
    if (instance !== undefined) {
      state = objectAssign(state, instance, {mode: 'edit'});
    }

    this.trigger(state);
  },

  dismissDialog: function() {
    console.debug('DialogStoreMixin::dismissDialog');
    this.trigger(this.getInitialDialogState());
  }
};

module.exports = DialogStoreMixin;
