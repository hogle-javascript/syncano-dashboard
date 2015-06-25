var Reflux                    = require('reflux'),

    CheckListStoreMixin       = require('../../mixins/CheckListStoreMixin'),
    StoreLoadingMixin         = require('../../mixins/StoreLoadingMixin'),
    WaitForStoreMixin         = require('../../mixins/WaitForStoreMixin'),

    SessionActions            = require('../Session/SessionActions'),
    ProfileInvitationsActions = require('./ProfileInvitationsActions');


var ProfileInvitationsStore = Reflux.createStore({
  listenables: ProfileInvitationsActions,
  mixins: [
    CheckListStoreMixin,
    StoreLoadingMixin,
    WaitForStoreMixin
  ],

  getInitialState: function () {
    return {
      items: []
    }
  },

  init: function () {
    this.data = this.getInitialState();
    this.waitFor(
      SessionActions.setUser,
      this.refreshData
    );
    this.setLoadingStates();
  },

  refreshData: function () {
    console.debug('ProfileInvitationsStore::refreshData');
    ProfileInvitationsActions.fetchInvitations();
  },

  getInviations: function (empty) {
    return this.data.items || empty || null;
  },

  setInvitations: function (items) {
    this.data.items = Object.keys(items).map(function(key) {
        return items[key];
    });
    this.trigger(this.data);
  },

  onFetchInvitations: function() {
    console.debug('ProfileInvitationsStore::onFetchInvitations');
    this.trigger(this.data);
  },

  onFetchInvitationsCompleted: function(items) {
    console.debug('ProfileInvitationsStore::onGetInstanesCompleted');
    ProfileInvitationsActions.setInvitations(items);
  },

  onFetchInvitationsFailure: function(items) {
    console.debug('ProfileInvitationsStore::onFetchInvitationsFailure');
    this.trigger(this.data);
  },

  onAcceptInvitationsCompleted: function() {
   this.data.hideDialogs = true;
   this.trigger(this.data);
   this.refreshData();
  },

  onAcceptInvitationsFailure: function() {
   this.data.hideDialogs = true;
   this.trigger(this.data);
   this.refreshData();
  },

  onDeclineInvitationsCompleted: function() {
   this.data.hideDialogs = true;
   this.trigger(this.data);
   this.refreshData();
  },

  onDeclineInvitationsFailure: function() {
   this.data.hideDialogs = true;
   this.trigger(this.data);
   this.refreshData();
  }

});

module.exports = ProfileInvitationsStore;