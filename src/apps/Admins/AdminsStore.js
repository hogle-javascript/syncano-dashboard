var Reflux                 = require('reflux'),

    // Utils & Mixins
    CheckListStoreMixin    = require('../../mixins/CheckListStoreMixin'),
    StoreFormMixin         = require('../../mixins/StoreFormMixin'),
    StoreLoadingMixin      = require('../../mixins/StoreLoadingMixin'),

    //Stores & Actions
    SessionStore           = require('../Session/SessionStore'),
    AdminsInvitationsStore = require('./AdminsInvitationsStore'),
    AdminsActions          = require('./AdminsActions');


var AdminsStore = Reflux.createStore({
  listenables : AdminsActions,
  mixins      : [
    Reflux.connect(AdminsInvitationsStore),
    CheckListStoreMixin,
    StoreFormMixin,
    StoreLoadingMixin
  ],

  roleMenuItems: [
    {
      payload : 'read',
      text    : 'read'
    },
    {
      payload : 'write',
      text    : 'write'
    },
    {
      payload : 'full',
      text    : 'full'
    }
  ],

  getInitialState: function () {
    return {
      items: [],
    }
  },

  init: function () {
    this.data = this.getInitialState();
    this.listenTo(SessionStore, this.refreshData);
    this.listenToForms();
    this.setLoadingStates();
  },

  refreshData: function (data) {
    console.debug('AdminsStore::refreshData');
    if (SessionStore.getInstance() !== null) {
      AdminsActions.getAdmins();
    }
  },

  getRoles: function () {
    return this.roleMenuItems;
  },

  onGetAdmins: function(items) {
    this.data.isLoading = true;
    this.trigger(this.data);
  },

  onGetAdminsCompleted: function(items) {
    console.debug('AdminsStore::onGetInstanesCompleted');

    this.data.items = Object.keys(items).map(function(item) {
        return items[item];
    });
    this.data.isLoading = false;
    this.trigger(this.data);
  },

  onUpdateAdminCompleted: function(paylod) {
    console.debug('AdminsStore::onUpdateAdminCompleted');
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  },

  onRemoveAdminsCompleted: function(payload) {
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  },

});

module.exports = AdminsStore;