var Reflux              = require('reflux'),

    // Utils & Mixins
    CheckListStoreMixin = require('../../mixins/CheckListStoreMixin'),
    StoreFormMixin      = require('../../mixins/StoreFormMixin'),

    //Stores & Actions
    SessionStore        = require('../Session/SessionStore'),
    AdminsActions       = require('./AdminsActions');


var AdminsStore = Reflux.createStore({
  listenables : AdminsActions,
  mixins      : [
    CheckListStoreMixin,
    StoreFormMixin
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
      isLoading: false
    }
  },

  init: function () {
    this.data = this.getInitialState();

    // We want to know when we are ready to download data for this store,
    // it depends on instance we working on
    this.listenTo(SessionStore, this.refreshData);
  },

  refreshData: function (data) {
    console.debug('AdminsStore::refreshData');
    if (SessionStore.instance) {
      AdminsActions.getAdmins();
    }
  },

  getRoleMenuIndex: function(role) {
    var selectedIndex = null;
    this.roleMenuItems.some(function(item, index) {
     if (role === item.payload) {
       selectedIndex = index;
       return true;
     }
    });
    return selectedIndex;
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

  onCreateAdminCompleted: function(payload) {
    console.debug('AdminsStore::onCreateAdminCompleted');
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
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