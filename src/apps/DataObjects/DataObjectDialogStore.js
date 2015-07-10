var Reflux             = require('reflux'),

    // Utils & Mixins
    StoreFormMixin     = require('../../mixins/StoreFormMixin'),
    DialogStoreMixin   = require('../../mixins/DialogStoreMixin'),

    //Stores & Actions
    DataObjectsActions = require('./DataObjectsActions'),
    ChannelsStore      = require('../Channels/ChannelsStore'),
    ChannelsActions    = require('../Channels/ChannelsActions');

var DataObjectDialogStore = Reflux.createStore({
  listenables : DataObjectsActions,
  mixins      : [
    StoreFormMixin,
    DialogStoreMixin
  ],

  getInitialState: function() {
    return {
      username : null,
      password : null,
      channel  : null,
      channels : [
        {payload: '', text: 'Loading...'}
      ]
    }
  },

  init: function() {
    this.listenToForms();
    this.listenTo(ChannelsActions.setChannels, this.getChannelsDropdown);
  },

  getChannelsDropdown: function() {
    console.debug('DataViewDialogStore::getChannelsDropdown');
    var channels = ChannelsStore.getChannelsDropdown();

    if (channels.length === 0) {
      channels = [{payload: '', text: 'No channels, add one first'}];
    }

    this.trigger({channels: channels});
  },

  onCreateDataObjectCompleted: function() {
    console.debug('DataObjectDialogStore::onCreateDataObjectCompleted');
    this.dismissDialog();
  },

  onUpdateDataObjectCompleted: function() {
    console.debug('DataObjectDialogStore::onUpdateDataObjectCompleted');
    this.dismissDialog();
  }

});

module.exports = DataObjectDialogStore;
