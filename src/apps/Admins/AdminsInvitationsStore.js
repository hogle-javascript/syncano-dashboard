var Reflux                   = require('reflux'),

    // Utils & Mixins
    CheckListStoreMixin      = require('../../mixins/CheckListStoreMixin'),
    StoreFormMixin           = require('../../mixins/StoreFormMixin'),
    WaitForStoreMixin        = require('../../mixins/WaitForStoreMixin'),

    //Stores & Actions
    SessionActions           = require('../Session/SessionActions'),
    SessionStore             = require('../Session/SessionStore'),
    AdminsInvitationsActions = require('./AdminsInvitationsActions');

var AdminsInvitationsStore = Reflux.createStore({
  listenables : AdminsInvitationsActions,
  mixins      : [
    CheckListStoreMixin,
    StoreFormMixin,
    WaitForStoreMixin
  ],

  getInitialState: function() {
    return {
      items     : [],
      isLoading : true
    }
  },

  init: function() {
    this.data = this.getInitialState();
    this.waitFor(
      SessionActions.setUser,
      SessionActions.setInstance,
      this.refreshData
    );
    this.listenToForms();
  },

  refreshData: function() {
    console.debug('AdminsInvitationsStore::refreshData');
    AdminsInvitationsActions.fetchInvitations();
  },

  setInvitations: function(items) {
    console.debug('AdminsInvitationsStore::setInvitations');

    this.data.items = Object.keys(items).map(function(key) {
      return items[key];
    });

    this.trigger(this.data);
  },

  getPendingInvitations: function() {
    console.debug('AdminsInvitationsStore::getPendingInvitations');

    var isInvitationPending = function(element) {
      return (element.state === "new");
    };

    var pendingInvitations = this.data.items.filter(isInvitationPending);

    return pendingInvitations;
  },

  onFetchInvitations: function(items) {
    this.data.isLoading = true;
    this.trigger(this.data);
  },

  onFetchInvitationsCompleted: function(items) {
    console.debug('AdminsInvitationsStore::onGetInstanesCompleted');
    this.data.isLoading = false;
    AdminsInvitationsActions.setInvitations(items);
  },

  onCreateInvitationCompleted: function() {
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData()
  },

  onRemoveInvitationCompleted: function() {
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  },

  onResendInvitationCompleted: function() {
    this.data.hideDialogs = true;
    AdminsInvitationsActions.uncheckAll();
  }

});

module.exports = AdminsInvitationsStore;
