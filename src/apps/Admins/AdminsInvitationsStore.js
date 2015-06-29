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

  setInvitations: function(items) {
    console.debug('AdminsInvitationsStore::setInvitations');

    this.data.items = Object.keys(items).map(function(key) {
      return items[key];
    });

    this.trigger(this.data);
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

  onCreateInvitationCompleted: function() {
    this.data.hideDialogs = true;
<<<<<<< HEAD
    this.refreshData();
=======
    this.trigger(this.data);
    this.refreshData()
>>>>>>> cd6c2f5064e840b0f714f7e0fa4ced62126213bd
  },

  onRemoveInvitationCompleted: function() {
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  },

  onResendInvitationCompleted: function() {
    this.data.hideDialogs = true;
<<<<<<< HEAD
    this.trigger(this.data);
=======
>>>>>>> cd6c2f5064e840b0f714f7e0fa4ced62126213bd
    AdminsInvitationsActions.uncheckAll();
  }

});

module.exports = AdminsInvitationsStore;
