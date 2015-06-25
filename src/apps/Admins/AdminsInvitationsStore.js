var Reflux                   = require('reflux'),

    // Utils & Mixins
    CheckListStoreMixin      = require('../../mixins/CheckListStoreMixin'),
    StoreFormMixin           = require('../../mixins/StoreFormMixin'),
    StoreLoadingMixin        = require('../../mixins/StoreLoadingMixin'),

    //Stores & Actions
    SessionStore             = require('../Session/SessionStore'),
    AdminsInvitationsActions = require('./AdminsInvitationsActions');


var AdminsInvitationsStore = Reflux.createStore({
  listenables : AdminsInvitationsActions,
  mixins      : [
    CheckListStoreMixin,
    StoreFormMixin,
    StoreLoadingMixin
  ],

  getInitialState: function () {
    return {
      items     : [],
      isLoading : false
    }
  },

  init: function () {
    this.data = this.getInitialState();
    this.listenTo(SessionStore, this.refreshData);
    this.listenToForms();
    this.setLoadingStates();
  },

  refreshData: function (data) {
    console.debug('AdminsInvitationsStore::refreshData');
    if (SessionStore.getInstance() !== null) {
      AdminsInvitationsActions.getInvitations();
    }
  },

  onGetInvitations: function(items) {
    this.trigger(this.data);
  },

  onGetInvitationsCompleted: function(items) {
    console.debug('AdminsInvitationsStore::onGetInstanesCompleted');
    this.data.items = Object.keys(items).map(function(item) {
        return items[item];
    });
    this.trigger(this.data);
  },

  onCreateInvitationCompleted: function() {
    this.data.hideDialogs = true;
    this.refreshData();
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