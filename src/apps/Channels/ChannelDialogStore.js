let Reflux = require('reflux'),

// Utils & Mixins
  StoreFormMixin = require('../../mixins/StoreFormMixin'),
  DialogStoreMixin = require('../../mixins/DialogStoreMixin'),

// Stores & Actions
  SessionStore = require('../Session/SessionStore'),
  ChannelsActions = require('./ChannelsActions');

let ChannelDialogStore = Reflux.createStore({
  listenables: ChannelsActions,
  mixins: [
    StoreFormMixin,
    DialogStoreMixin
  ],

  getInitialState() {
    return {
      name: null,
      description: null,
      type: 'default',
      custom_publish: null,
      group: null,
      group_permissions: 'none',
      other_permissions: 'none'
    };
  },

  init() {
    this.listenToForms();
  },

  onCreateChannelCompleted(resp) {
    console.debug('ChannelsStore::onCreateChannelCompleted');
    this.dismissDialog();
    ChannelsActions.fetch();
  },

  onUpdateChannelCompleted() {
    console.debug('ChannelDialogStore::onUpdateChannelCompleted');
    this.dismissDialog();
    ChannelsActions.fetchChannels();
  },

  onFetchChannelRuntimesCompleted(runtimes) {
    console.debug('ChannelDialogStore::onFetchChannelRuntimesCompleted');
    ChannelsActions.setChannelRuntimes(runtimes);
  }

});

module.exports = ChannelDialogStore;
