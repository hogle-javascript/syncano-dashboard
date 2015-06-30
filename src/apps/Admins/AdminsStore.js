var Reflux                   = require('reflux'),

    // Utils & Mixins
    CheckListStoreMixin      = require('../../mixins/CheckListStoreMixin'),
    WaitForStoreMixin        = require('../../mixins/WaitForStoreMixin'),
    StoreLoadingMixin        = require('../../mixins/StoreLoadingMixin'),

    //Stores & Actions
    SessionActions           = require('../Session/SessionActions'),
    AdminsInvitationsActions = require('./AdminsInvitationsActions'),
    AdminsInvitationsStore   = require('./AdminsInvitationsStore'),
    AdminsActions            = require('./AdminsActions');

var AdminsStore = Reflux.createStore({
  listenables : AdminsActions,
  mixins      : [
    Reflux.connect(AdminsInvitationsStore),
    CheckListStoreMixin,
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
    this.setLoadingStates();
  },

  refreshData: function() {
    console.debug('AdminsStore::refreshData');
    AdminsActions.fetchAdmins();
    AdminsInvitationsActions.fetchInvitations();
  },

  setAdmins: function(items) {
    console.debug('AdminsStore::setAdmins');

    this.data.items = Object.keys(items).map(function(key) {
      return items[key];
    });

    this.trigger(this.data);
  },

  onFetchAdmins: function() {
    console.debug('AdminsStore::onFetchAdmins');
    this.trigger(this.data);
  },

  onFetchAdminsCompleted: function(items) {
    console.debug('AdminsStore::onFetchAdminsCompleted');
    this.trigger(this.data);
    AdminsActions.setAdmins(items);
  },

  onRemoveAdminsCompleted: function() {
    console.debug('AdminsStore::onRemoveAdminsCompleted');
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  }

});

module.exports = AdminsStore;
