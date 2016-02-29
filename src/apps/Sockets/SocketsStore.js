import Reflux from 'reflux';
import _ from 'lodash';

import {StoreHelpersMixin, StoreLoadingMixin, WaitForStoreMixin}from '../../mixins';

import SessionActions from '../Session/SessionActions';
import Actions from './SocketsActions';

export default Reflux.createStore({
  listenables: Actions,

  mixins: [
    StoreHelpersMixin,
    StoreLoadingMixin,
    WaitForStoreMixin
  ],

  getInitialState() {
    return {
      data: [],
      scripts: [],
      triggers: [],
      schedules: [],
      channels: [],
      gcmPushNotifications: [],
      apnsPushNotifications: [],

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

  refreshData() {
    console.debug('SocketsStore::refreshData');
    Actions.fetchSockets();
  },

  hasGCMConfig(items) {
    if (items.length > 0) {
      return !_.isEmpty(items[0].development_api_key) || !_.isEmpty(items[0].production_api_key);
    }

    return false;
  },

  hasAPNSConfig(items) {
    if (items.length > 0) {
      return items[0].development_certificate || items[0].production_certificate;
    }

    return false;
  },

  getPushNotificationsItems(items, type, devicesCount) {
    return items.map((item) => {
      item.name = type;
      item.hasConfig = type === 'GCM' ? this.hasGCMConfig(items) : this.hasAPNSConfig(items);
      item.devicesCount = devicesCount;

      return item;
    }).filter((item) => item.hasConfig);
  },

  onFetchSocketsCompleted(sockets) {
    console.debug('SocketsStore::onFetchSockets');
    const gcmDevicesCount = this.saveListFromSyncano(sockets.gcmDevices).length;
    const apnsDevicesCount = this.saveListFromSyncano(sockets.apnsDevices).length;
    const gcmItems = this.getPushNotificationsItems([sockets.gcmPushNotifications], 'GCM', gcmDevicesCount);
    const apnsItems = this.getPushNotificationsItems([sockets.apnsPushNotifications], 'APNS', apnsDevicesCount);

    this.data.data = this.saveListFromSyncano(sockets.data);
    this.data.scripts = this.saveListFromSyncano(sockets.scriptsSockets);
    this.data.triggers = this.saveListFromSyncano(sockets.triggers);
    this.data.schedules = this.saveListFromSyncano(sockets.schedules);
    this.data.channels = this.saveListFromSyncano(sockets.channels);
    this.data.gcmPushNotifications = gcmItems;
    this.data.apnsPushNotifications = apnsItems;

    this.trigger(this.data);
  }
});
