import objectAssign from 'object-assign';

export default {

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

    if (typeof instance !== 'undefined') {
      state = objectAssign(state, instance, {_dialogMode: 'edit'});
    } else if (typeof secondInstance !== 'undefined') {
      state = objectAssign(state, {secondInstance});
    }

    this.trigger(state);
  },

  dismissDialog() {
    console.debug('DialogStoreMixin::dismissDialog');
    this.trigger(this.getInitialDialogState());
  }
};
