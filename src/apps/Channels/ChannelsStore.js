import Reflux from 'reflux';

import CheckListStoreMixin from '../../mixins/CheckListStoreMixin';
import WaitForStoreMixin from '../../mixins/WaitForStoreMixin';

import SessionActions from '../Session/SessionActions';
import ChannelsActions from './ChannelsActions';

export default Reflux.createStore({
  listenables: ChannelsActions,
  mixins: [
    CheckListStoreMixin,
    WaitForStoreMixin
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
    ChannelsActions.fetchChannels();
  },

  setChannels(items) {
    this.data.items = Object.keys(items).map((key) => {
      return items[key];
    });
    this.data.isLoading = false;
    this.trigger(this.data);
  },

  onRemoveChannels() {
    this.data.isLoading = true;
    this.trigger(this.data);
  },

  onRemoveChannelsCompleted() {
    console.debug('ChannelsStore::onRemoveChannelsCompleted');
    this.data.hideDialogs = true;
    this.data.isLoading = false;
    this.refreshData();
  },

  onFetchChannels() {
    console.debug('ChannelsStore::onFetchChannels');
    this.data.isLoading = true;
    this.trigger(this.data);
  },

  onFetchChannelsCompleted(items) {
    console.debug('ChannelsStore::onFetchChannelsCompleted');
    ChannelsActions.setChannels(items);
  }

});
