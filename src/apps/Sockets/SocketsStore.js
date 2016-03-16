import Reflux from 'reflux';
import _ from 'lodash';

import {StoreHelpersMixin, StoreLoadingMixin, WaitForStoreMixin, CheckListStoreMixin} from '../../mixins';

import SessionActions from '../Session/SessionActions';
import Actions from './SocketsActions';
import DataActions from '../Data/DataEndpointsActions';
import ScriptsActions from '../ScriptEndpoints/ScriptEndpointsActions';
import TriggersActions from '../Triggers/TriggersActions';
import SchedulesActions from '../Schedules/SchedulesActions';
import ChannelsActions from '../Channels/ChannelsActions';
import APNSActions from '../PushNotifications/APNS/APNSPushNotificationsActions';
import GCMActions from '../PushNotifications/GCM/GCMPushNotificationsActions';

export default Reflux.createStore({
  listenables: Actions,

  mixins: [
    Reflux.ListenerMixin,
    CheckListStoreMixin,
    StoreHelpersMixin,
    StoreLoadingMixin,
    WaitForStoreMixin
  ],

  getInitialState() {
    return {
      data: [],
      scriptEndpoints: [],
      triggers: [],
      schedules: [],
      channels: [],
      gcmPushNotifications: [],
      apnsPushNotifications: [],

      hasAnyItem: false,
      isLoading: true
    };
  },

  socketsListenables: [
    DataActions.createDataEndpoint.completed, DataActions.updateDataEndpoint.completed,
    DataActions.removeDataEndpoints.completed, ScriptsActions.createScriptEndpoint.completed,
    ScriptsActions.updateScriptEndpoint.completed, ScriptsActions.removeScriptEndpoints.completed,
    TriggersActions.createTrigger.completed, TriggersActions.updateTrigger.completed,
    TriggersActions.removeTriggers.completed, SchedulesActions.createSchedule.completed,
    SchedulesActions.updateSchedule.completed, SchedulesActions.removeSchedules.completed,
    ChannelsActions.createChannel.completed, ChannelsActions.updateChannel.completed,
    ChannelsActions.removeChannels.completed, APNSActions.configAPNSPushNotification.completed,
    GCMActions.configGCMPushNotification.completed
  ],

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

  addSocketsListeners() {
    _.forEach(this.socketsListenables, (listenable) => this.listenTo(listenable, this.refreshData));
  },

  removeSocketsListeners() {
    _.forEach(this.socketsListenables, (listenable) => this.stopListeningTo(listenable));
  },

  clearSockets() {
    this.data = this.getInitialState();
    this.trigger(this.data);
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
    return _.map(items, (item) => {
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
    this.data.scriptEndpoints = this.saveListFromSyncano(sockets.scriptEndpoints);
    this.data.triggers = this.saveListFromSyncano(sockets.triggers);
    this.data.schedules = this.saveListFromSyncano(sockets.schedules);
    this.data.channels = this.saveListFromSyncano(sockets.channels);
    this.data.gcmPushNotifications = gcmItems;
    this.data.apnsPushNotifications = apnsItems;
    this.data.hasAnyItem = _.some(this.data, (value) => value.length);

    this.trigger(this.data);
  }
});
