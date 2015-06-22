var Reflux              = require('reflux'),

    // Utils & Mixins
    CheckListStoreMixin = require('../../mixins/CheckListStoreMixin'),
    StoreFormMixin      = require('../../mixins/StoreFormMixin'),

    //Stores & Actions
    SessionStore        = require('../Session/SessionStore'),
    GroupsActions       = require('./GroupsActions');


var GroupsStore = Reflux.createStore({
  listenables : GroupsActions,
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
    console.debug('GroupsStore::refreshData');
    if (SessionStore.getInstance() !== null) {
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