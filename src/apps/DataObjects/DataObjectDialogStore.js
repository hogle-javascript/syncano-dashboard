import Reflux from 'reflux';

// Utils & Mixins
import Mixins from '../../mixins';

//Stores & Actions
import DataObjectsActions from './DataObjectsActions';
import ChannelsStore from '../Channels/ChannelsStore';
import ChannelsActions from '../Channels/ChannelsActions';

export default Reflux.createStore({
  listenables : DataObjectsActions,
  mixins      : [
    Mixins.StoreForm,
    Mixins.DialogStore
  ],

  getInitialState() {
    return {
      username : null,
      password : null,
      channels : [
        {payload: '', text: 'Loading...'}
      ]
    }
  },

  init() {
    this.listenToForms();
    this.listenTo(ChannelsActions.setChannels, this.getChannelsDropdown);
  },

  getChannelsDropdown() {
    console.debug('DataViewDialogStore::getChannelsDropdown');
    var channels = ChannelsStore.getChannelsDropdown();

    if (channels.length === 0) {
      channels = [{payload: '', text: 'No channels, add one first'}];
    }

    this.trigger({channels: channels});
  },

  onCreateDataObjectCompleted() {
    console.debug('DataObjectDialogStore::onCreateDataObjectCompleted');
    this.dismissDialog();
  },

  onUpdateDataObjectCompleted() {
    console.debug('DataObjectDialogStore::onUpdateDataObjectCompleted');
    this.dismissDialog();
  }
});
