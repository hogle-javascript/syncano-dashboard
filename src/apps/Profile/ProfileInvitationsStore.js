var Reflux              = require('reflux'),

    CheckListStoreMixin = require('../../mixins/CheckListStoreMixin'),
    StoreLoadingMixin   = require('../../mixins/StoreLoadingMixin'),

    ProfileActions      = require('./ProfileActions');


var ProfileInvitationsStore = Reflux.createStore({
  listenables: ProfileActions,
  mixins: [
    CheckListStoreMixin,
    StoreLoadingMixin
  ],

  getInitialState: function () {
    return {
      items: [],
    }
  },

  init: function () {
    this.data = this.getInitialState();
    this.setLoadingStates()
  },

  onGetInvitations: function() {
    console.debug('ProfileInvitationsStore::onGetInvitations');
    this.trigger(this.data);
  },

  onGetInvitationsCompleted: function(items) {
    console.debug('ProfileInvitationsStore::onGetInstanesCompleted');
    this.data.items = Object.keys(items).map(function(item) {
        return items[item];
    });
    this.trigger(this.data);
  },

  onGetInvitationsFailure: function(items) {
    console.debug('ProfileInvitationsStore::onGetInvitationsFailure');
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