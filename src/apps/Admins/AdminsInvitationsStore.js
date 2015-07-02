var Reflux                   = require('reflux'),

    // Utils & Mixins
    CheckListStoreMixin      = require('../../mixins/CheckListStoreMixin'),
    StoreFormMixin           = require('../../mixins/StoreFormMixin'),
    StoreLoadingMixin        = require('../../mixins/StoreLoadingMixin'),
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
    StoreLoadingMixin,
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
    this.setLoadingStates();
  },

  refreshData: function() {
    console.debug('AdminsInvitationsStore::refreshData');
    AdminsInvitationsActions.fetchInvitations();
  },

  selectAllAdminsInvitations: function() {
    this.getPendingInvitations().forEach(function(item) {
      item.checked = true;
    });
    this.trigger(this.data);
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
      return (element.state === 'new');
    };

    var pendingInvitations = this.data.items.filter(isInvitationPending);

    return pendingInvitations;
  },

  onFetchInvitations: function(items) {
    this.trigger(this.data);
  },

  onFetchInvitationsCompleted: function(items) {
    console.debug('AdminsInvitationsStore::onGetInstanesCompleted');
    this.data.items = Object.keys(items).map(function(item) {
      return items[item];
    });
    this.trigger(this.data);
    AdminsInvitationsActions.setInvitations(items);
  },

  onRemoveInvitationCompleted: function() {
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  },

  onResendInvitationCompleted: function() {
    this.data.hideDialogs = true;
    this.trigger(this.data);
    AdminsInvitationsActions.uncheckAll();
  }

});

module.exports = AdminsInvitationsStore;
