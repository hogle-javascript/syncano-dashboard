var Reflux              = require('reflux'),

    CheckListStoreMixin = require('../../mixins/CheckListStoreMixin'),
    StoreLoadingMixin   = require('../../mixins/StoreLoadingMixin'),
    WaitForStoreMixin   = require('../../mixins/WaitForStoreMixin'),

    SessionActions      = require('../Session/SessionActions'),
    ChannelsActions     = require('./ChannelsActions');

var ChannelsStore = Reflux.createStore({
  listenables: ChannelsActions,
  mixins: [
    CheckListStoreMixin,
    StoreLoadingMixin,
    WaitForStoreMixin
  ],

  channelTypes: [
    {
      payload : 'default',
      text    : 'Default'
    },
    {
      payload : 'separate_rooms',
      text    : 'Separate rooms'
    }
  ],

  channelPermissions: [
    {
      'text'    : 'none',
      'payload' : 'none'
    },
    {
      'text'    : 'subscribe',
      'payload' : 'subscribe'
    },
    {
      'text'    : 'publish',
      'payload' : 'publish'
    }
  ],

  getInitialState: function() {
    return {
      items : [],
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

  getItems: function() {
    return this.data.items;
  },

  getChannelsDropdown: function() {
    return this.data.items.map(function(item) {
      return {
        payload : item.id,
        text    : item.name
      }
    });
  },

  getChannelTypesDropdown: function() {
    return this.channelTypes;
  },
  getChannelPermissionsDropdown: function() {
    return this.channelPermissions;
  },

  refreshData: function() {
    console.debug('ChannelsStore::refreshData');
    ChannelsActions.fetchChannels();
  },

  setChannels: function(items) {
    this.data.items = Object.keys(items).map(function(key) {
      return items[key];
    });
    this.trigger(this.data);
  },

  onRemoveChannelsCompleted: function(payload) {
    console.debug('ChannelsStore::onRemoveChannelsCompleted');
    this.data.hideDialogs = true;
    this.refreshData();
  },

  onFetchChannels: function() {
    console.debug('ChannelsStore::onFetchChannels');
    this.trigger(this.data);
  },

  onFetchChannelsCompleted: function(items) {
    console.debug('ChannelsStore::onFetchChannelsCompleted');
    ChannelsActions.setChannels(items);
  }

});

module.exports = ChannelsStore;
