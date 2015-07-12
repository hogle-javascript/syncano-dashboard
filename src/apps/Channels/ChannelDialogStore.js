var Reflux           = require('reflux'),

    // Utils & Mixins
    StoreFormMixin   = require('../../mixins/StoreFormMixin'),
    DialogStoreMixin = require('../../mixins/DialogStoreMixin'),

    //Stores & Actions
    SessionStore     = require('../Session/SessionStore'),
    ChannelsActions = require('./ChannelsActions');

var ChannelDialogStore = Reflux.createStore({
  listenables : ChannelsActions,
  mixins      : [
    StoreFormMixin,
    DialogStoreMixin
  ],

  getInitialState: function() {
    return {
      name              : null,
      description       : null,
      type              : 'default',
      custom_publish    : null,
      group             : null,
      group_permissions : 'none',
      other_permissions : 'none'
    };
  },

  init: function() {
    this.listenToForms();
  },

  onCreateChannelCompleted: function(resp) {
    console.debug('ChannelsStore::onCreateChannelCompleted');
    this.dismissDialog();
    ChannelsActions.fetch();
  },

  onUpdateChannelCompleted: function() {
    console.debug('ChannelDialogStore::onUpdateChannelCompleted');
    this.dismissDialog();
    ChannelsActions.fetchChannels();
  },

  onFetchChannelRuntimesCompleted: function(runtimes) {
    console.debug('ChannelDialogStore::onFetchChannelRuntimesCompleted');
    ChannelsActions.setChannelRuntimes(runtimes);
  }

});

module.exports = ChannelDialogStore;
