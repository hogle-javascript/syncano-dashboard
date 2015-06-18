var Reflux                   = require('reflux'),

    // Utils & Mixins
    CheckListStoreMixin      = require('../../mixins/CheckListStoreMixin'),
  
    //Stores & Actions
    SessionStore             = require('../Session/SessionStore'),
    AdminsInvitationsActions = require('./AdminsInvitationsActions');


var AdminsInvitationsStore = Reflux.createStore({
  listenables : AdminsInvitationsActions,
  mixins      : [CheckListStoreMixin],

  getInitialState: function () {
    return {
      // Lists
      items: [],
      isLoading: false,

      // Dialogs
      errors: {},
    }
  },

  init: function () {

    this.data = {
      // List
      items: [],
      isLoading: false,

      // Dialogs
      errors: {},
      canSubmit: true,
    };

    // We want to know when we are ready to download data for this store,
    // it depends on instance we working on
    this.listenTo(SessionStore, this.refreshData);
  },

  refreshData: function (data) {
    console.debug('AdminsInvitationsStore::refreshData');
    if (SessionStore.instance) {
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
  },


});

module.exports = AdminsInvitationsStore;