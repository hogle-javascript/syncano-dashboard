var Reflux         = require('reflux'),
    objectAssign   = require('object-assign'),

    // Utils & Mixins
    StoreFormMixin = require('../../mixins/StoreFormMixin'),

    //Stores & Actions
    UsersActions   = require('./UsersActions');


var UserDialogStore = Reflux.createStore({
  listenables : UsersActions,
  mixins      : [StoreFormMixin],

  getInitialState: function () {
    return {
      mode     : 'add',
      visible  : false,

      username : null,
      password : null
    }
  },

  init: function () {
    this.listenToForms();
  },

  showDialog: function (instance) {
    console.debug('UserDialogStore::showDialog');

    var state = {visible: true};
    if (instance !== undefined) {
      state = objectAssign(state, instance, {mode: 'edit'});
    }

    this.trigger(state);
  },

  dismissDialog: function () {
    console.debug('UserDialogStore::dismissDialog');
    this.trigger(this.getInitialState());
  },

  onCreateUserCompleted: function(payload) {
    console.debug('UserDialogStore::onCreateUserCompleted');
    this.dismissDialog();
    UsersActions.fetchUsers();
  },

  onUpdateUserCompleted: function(paylod) {
    console.debug('UserDialogStore::onUpdateUserCompleted');
    this.dismissDialog();
    UsersActions.fetchUsers();
  }

});

module.exports = UserDialogStore;