var Reflux                   = require('reflux'),

    // Utils & Mixins
    CheckListStoreMixin      = require('../../mixins/CheckListStoreMixin'),
    StoreFormMixin           = require('../../mixins/StoreFormMixin'),

    //Stores & Actions
    SessionStore             = require('../Session/SessionStore'),
    AdminsInvitationsActions = require('./AdminsInvitationsActions');


var AdminsInvitationsStore = Reflux.createStore({
  listenables : AdminsInvitationsActions,
  mixins      : [
    CheckListStoreMixin,
    StoreFormMixin
  ],

  getInitialState: function () {
    return {
      items: [],
      isLoading: false
    }
  },

  init: function () {
    this.data = this.getInitialState();
    this.listenTo(SessionStore, this.refreshData);
    this.listenToForms();
  },

  refreshData: function (data) {
    console.debug('AdminsInvitationsStore::refreshData');
    if (SessionStore.getInstance() !== null) {
      AdminsInvitationsActions.getInvitations();
    }
  },

  onGetInvitations: function(items) {
    this.data.isLoading = true;
    this.trigger(this.data);
  },

  onGetInvitationsCompleted: function(items) {
    console.debug('AdminsInvitationsStore::onGetInstanesCompleted');
    this.data.items = Object.keys(items).map(function(item) {
        return items[item];
    });
    this.data.isLoading = false;
    this.trigger(this.data);
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