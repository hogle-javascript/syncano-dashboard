var Reflux           = require('reflux'),

    // Utils & Mixins
    StoreFormMixin   = require('../../mixins/StoreFormMixin'),
    DialogStoreMixin = require('../../mixins/DialogStoreMixin'),

    //Stores & Actions
    GroupsActions    = require('./GroupsActions');

var GroupDialogStore = Reflux.createStore({
  listenables : GroupsActions,
  mixins      : [
    StoreFormMixin,
    DialogStoreMixin
  ],

  getInitialState: function() {
    return {
      label : ''
    };
  },

  init: function() {
    this.listenToForms();
  },

  onCreateGroupCompleted: function() {
    console.debug('GroupDialogStore::onCreateGroupCompleted');
    this.dismissDialog();
    GroupsActions.fetchGroups();
  },

  onUpdateGroupCompleted: function() {
    console.debug('GroupDialogStore::onUpdateGroupCompleted');
    this.dismissDialog();
    GroupsActions.fetchGroups();
  }

});

module.exports = GroupDialogStore;
