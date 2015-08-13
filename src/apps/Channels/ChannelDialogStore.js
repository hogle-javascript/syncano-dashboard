import Reflux from 'reflux';

// Utils & Mixins
import StoreFormMixin from '../../mixins/StoreFormMixin';
import DialogStoreMixin from '../../mixins/DialogStoreMixin';

// Stores & Actions
import SessionStore from '../Session/SessionStore';
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
