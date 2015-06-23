var Reflux              = require('reflux'),

    // Utils & Mixins
    CheckListStoreMixin = require('../../mixins/CheckListStoreMixin'),
    StoreFormMixin      = require('../../mixins/StoreFormMixin'),

    //Stores & Actions

    ClassesStore        = require('./ClassesStore'),
    SessionStore        = require('../Session/SessionStore'),
    DataObjectsActions  = require('./DataObjectsActions');


var DataObjectsStore = Reflux.createStore({
  listenables : DataObjectsActions,
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

    // We want to know when we are ready to download data for this store,
    // it depends on instance we working on
    this.listenTo(SessionStore, this.refreshData);
    this.listenTo(ClassesStore, this.refreshData);
  },

  refreshData: function (data) {
    console.debug('DataObjectsStore::refreshData');
    if (SessionStore.instance) {
      if (ClassesStore.getCheckedItem()){
          DataObjectsActions.getDataObjects(ClassesStore.getCheckedItem().name);
      }
    }
  },

  renderTableData: function() {
    var items = [];
    this.data.items.map(function(item) {
      var row = {};
      Object.keys(item).map(function(key) {
        var value = item[key] ? item[key] : null;
        row[key] = {content: value}
      });
      items.push(row);
    });
    return items;

  },

  onGetDataObjects: function(items) {
    this.data.isLoading = true;
    this.trigger(this.data);
  },

  onGetDataObjectsCompleted: function(items) {
    console.debug('DataObjectsStore::onGetInstanesCompleted');

    this.data.items = Object.keys(items).map(function(item) {
        return items[item];
    });
    this.data.isLoading = false;
    this.trigger(this.data);
  },

  onCreateDataObjectCompleted: function(payload) {
    console.debug('DataObjectsStore::onCreateDataObjectCompleted');
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  },

  onUpdateDataObjectCompleted: function(paylod) {
    console.debug('DataObjectsStore::onUpdateDataObjectCompleted');
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  },

  onRemoveDataObjectsCompleted: function(payload) {
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  },

});

module.exports = DataObjectsStore;