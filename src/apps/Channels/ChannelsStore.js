import Reflux from 'reflux';

import Mixins from '../../mixins';

import SessionActions from '../Session/SessionActions';
import Actions from './ChannelsActions';

export default Reflux.createStore({
  listenables: Actions,

  mixins: [
    Mixins.CheckListStore,
    Mixins.WaitForStore,
    Mixins.StoreLoading
  ],

  channelTypes: [
    {
      payload: 'default',
      text: 'Default'
    },
    {
      payload: 'separate_rooms',
      text: 'Separate rooms'
    }
  ],

  channelPermissions: [
    {
      text: 'none',
      payload: 'none'
    },
    {
      text: 'subscribe',
      payload: 'subscribe'
    },
    {
      text: 'publish',
      payload: 'publish'
    }
  ],

  getInitialState() {
    return {
      items: [],
      isLoading: true
    };
  },

  init() {
    this.data = this.getInitialState();
    this.waitFor(
      SessionActions.setInstance,
      this.refreshData
    );
    this.setLoadingStates();
  },

  getItems() {
    return this.data.items;
  },

  getChannelsDropdown() {
    let dropdown = [{
      payload: 'no channel',
      text: 'no channel'
    }];

    return dropdown.concat(this.data.items.map((item) => {
      return {
        payload: item.name,
        text: item.name
      };
    }));
  },

  getChannelTypesDropdown() {
    return this.channelTypes;
  },
  getChannelPermissionsDropdown() {
    return this.channelPermissions;
  },

  refreshData() {
    console.debug('ChannelsStore::refreshData');
    Actions.fetchChannels();
  },

  setChannels(items) {
    this.data.items = items;
    this.trigger(this.data);
  },

  onRemoveChannelsCompleted() {
    console.debug('ChannelsStore::onRemoveChannelsCompleted');
    this.refreshData();
  },

  onFetchChannelsCompleted(items) {
    console.debug('ChannelsStore::onFetchChannelsCompleted');
    Actions.setChannels(items._items);
  }
});
