import Reflux from 'reflux';

// Utils & Mixins
import {StoreFormMixin, DialogStoreMixin} from '../../mixins';

// Stores & Actions
import ChannelsActions from './ChannelsActions';

export default Reflux.createStore({
  listenables: ChannelsActions,
  mixins: [
    StoreFormMixin,
    DialogStoreMixin
  ],

  getInitialState() {
    return {
      name: null,
      type: 'default',
      custom_publish: false,
      group: null,
      group_permissions: 'none',
      other_permissions: 'none'
    };
  },

  init() {
    this.listenToForms();
  },

  onCreateChannelCompleted() {
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
