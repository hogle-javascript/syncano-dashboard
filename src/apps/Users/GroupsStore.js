var Reflux              = require('reflux'),

    // Utils & Mixins
    CheckListStoreMixin = require('../../mixins/CheckListStoreMixin'),
    StoreFormMixin      = require('../../mixins/StoreFormMixin'),
  
    //Stores & Actions
    SessionStore        = require('../Session/SessionStore'),
    GroupsActions       = require('./GroupsActions');


var GroupsStore = Reflux.createStore({
  listenables : GroupsActions,
  mixins      : [CheckListStoreMixin, StoreFormMixin],

  getInitialState: function () {
    return {
      // Lists
      items: [],
      isLoading: false,

      // Dialogs
      errors: {}
    }
  },

  init: function () {

    this.data = {
      // List
      items: [],
      isLoading: false,

      // Dialogs
      errors: {},
      canSubmit: true
    };

    // We want to know when we are ready to download data for this store,
    // it depends on instance we working on
    this.listenTo(SessionStore, this.refreshData);
  },

  refreshData: function (data) {
    console.debug('GroupsStore::refreshData');
    if (SessionStore.instance) {
      GroupsActions.getGroups();
    }
  },

  onGetGroups: function(items) {
    this.data.isLoading = true;
    this.trigger(this.data);
  },

  onGetGroupsCompleted: function(items) {
    console.debug('GroupsStore::onGetInstanesCompleted');

    this.data.items = Object.keys(items).map(function(item) {
        return items[item];
    });
    this.data.isLoading = false;
    this.trigger(this.data);
  },

  onCreateGroupCompleted: function(payload) {
    console.debug('GroupsStore::onCreateGroupCompleted');
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  },

  onUpdateGroupCompleted: function(paylod) {
    console.debug('GroupsStore::onUpdateGroupCompleted');
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  },

  onRemoveGroupsCompleted: function(payload) {
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  }

});

module.exports = GroupsStore;