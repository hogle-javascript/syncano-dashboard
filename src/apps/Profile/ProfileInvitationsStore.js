var Reflux              = require('reflux'),
    CheckListStoreMixin = require('../../mixins/CheckListStoreMixin'),
    ProfileActions      = require('./ProfileActions');


var ProfileInvitationsStore = Reflux.createStore({
  listenables: ProfileActions,
  mixins: [CheckListStoreMixin],

  getInitialState: function () {
    return {
      items     : [],
      isLoading : false
    }
  },

  init: function () {
    this.data = this.getInitialState();
    this.listenToForms();
  },

  onGetInvitations: function() {
    console.debug('ProfileInvitationsStore::onGetInvitations');
    this.data.isLoading = true;
    this.trigger(this.data);
  },

  onGetInvitationsCompleted: function(items) {
    console.debug('ProfileInvitationsStore::onGetInstanesCompleted');
    this.data.items = Object.keys(items).map(function(item) {
        return items[item];
    });
    this.data.isLoading = false;
    this.trigger(this.data);
  },

  onGetInvitationsFailure: function(items) {
    console.debug('ProfileInvitationsStore::onGetInvitationsFailure');
    this.data.isLoading = false;
    this.trigger(this.data);
  },

  onAcceptInvitationsCompleted: function() {
   this.data.hideDialogs = true;
   this.trigger(this.data);
   ProfileActions.getInvitations();
  },

  onAcceptInvitationsFailure: function() {
   this.data.hideDialogs = true;
   this.trigger(this.data);
   ProfileActions.getInvitations();
  },

  onDeclineInvitationsCompleted: function() {
   this.data.hideDialogs = true;
   this.trigger(this.data);
   ProfileActions.getInvitations();
  },

  onDeclineInvitationsFailure: function() {
   this.data.hideDialogs = true;
   this.trigger(this.data);
   ProfileActions.getInvitations();
  }

});

module.exports = ProfileInvitationsStore;