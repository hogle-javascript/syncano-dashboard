var Reflux              = require('reflux'),

    // Utils & Mixins
    CheckListStoreMixin = require('../../mixins/CheckListStoreMixin'),
    WaitForStoreMixin   = require('../../mixins/WaitForStoreMixin'),

    //Stores & Actions
    Constants           = require('../../constants/Constants'),
    SessionActions      = require('../Session/SessionActions'),
    DataViewsActions    = require('./DataViewsActions');

var DataViewsStore = Reflux.createStore({
  listenables : DataViewsActions,
  mixins      : [
    CheckListStoreMixin,
    WaitForStoreMixin
  ],

  getInitialState: function() {
    return {
      items     : [],
      isLoading : false
    }
  },

  init: function() {
    this.data = this.getInitialState();
    this.waitFor(
      SessionActions.setUser,
      SessionActions.setInstance,
      this.refreshData
    );
  },

  getDataViews: function(empty) {
    return this.data.items || empty || null;
  },

  setDataViews: function(items) {
    console.debug('DataViewsStore::setDataViews');
    this.data.items = Object.keys(items).map(function(key) {
      return items[key];
    });
    this.trigger(this.data);
  },

  refreshData: function() {
    console.debug('DataViewsStore::refreshData');
    DataViewsActions.fetchDataViews();
  },

  onFetchDataViews: function() {
    console.debug('DataViewsStore::onFetchDataViews');
    this.data.isLoading = true;
    this.trigger(this.data);
  },

  onFetchDataViewsCompleted: function(items) {
    console.debug('DataViewsStore::onFetchDataViewsCompleted');
    this.data.isLoading = false;
    DataViewsActions.setDataViews(items);
  },

  onRemoveDataViewsCompleted: function() {
    console.debug('DataViewsStore::onRemoveDataViewsCompleted');
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  }

});

module.exports = DataViewsStore;
