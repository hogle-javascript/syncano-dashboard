import React from 'react';

import ChannelsActions from '../Channels/ChannelsActions';
import DataViewsActions from '../Data/DataViewsActions';
import GroupsActions from '../Users/GroupsActions';
import WebooksActions from '../Webhooks/WebhooksActions';
import TriggersActions from '../Tasks/TriggersActions';
import SchedulesActions from '../Tasks/SchedulesActions';

import Socket from '../../common/Socket';

export default React.createClass({

  displayName: 'SocketsEmpty',

  getStyles() {
    return {
      container: {
        margin: '20px auto'
      },
      title: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 600
      },
      subtitle: {
        textAlign: 'center',
        fontSize: 20,
        padding: '20px 10px 40px 10px'
      },
      listContainer: {
        display: 'flex',
        flexDirection: 'column'
      }
    };
  },

  showGroupAddDialog() {
    GroupsActions.showDialog();
  },

  showTriggerAddDialog() {
    TriggersActions.showDialog();
  },

  showScheduleAddDialog() {
    SchedulesActions.showDialog();
  },

  showChannelAddDialog() {
    ChannelsActions.showDialog();
  },

  showDataViewAddDialog() {
    DataViewsActions.showDialog();
  },

  showWebhookAddDialog() {
    WebhooksActions.showDialog();
  },

  render() {
    let styles = this.getStyles();

    return (
      <div style={styles.container}>
        <div style={styles.title}>
          Start building your app here!
        </div>
        <div style={styles.subtitle}>
          Pick a functionality you need and start building your API
        </div>
        <Socket.EmptyListItem
          handleAdd={() => {console.error('asdasd');}}
          socketName="Data"
          title="Data">
          Logic of your app in a cloud in your favorite language
          </Socket.EmptyListItem>
        <Socket.EmptyListItem
          handleAdd={() => {console.error('asdasd');}}
          socketName="Users"
          title="Users & Groups">
          Logic of your app in a cloud in your favorite language
          </Socket.EmptyListItem>
        <Socket.EmptyListItem
          handleAdd={() => {console.error('asdasd');}}
          socketName="Channel"
          title="Channel">
          Logic of your app in a cloud in your favorite language
          </Socket.EmptyListItem>
        <Socket.EmptyListItem
          handleAdd={() => {console.error('asdasd');}}
          socketName="Webhook"
          title="CodeBox">
          Logic of your app in a cloud in your favorite language
          </Socket.EmptyListItem>
        <Socket.EmptyListItem
          handleAdd={() => {console.error('asdasd');}}
          socketName="Push"
          title="Push Notification">
          Logic of your app in a cloud in your favorite language
          </Socket.EmptyListItem>
        <Socket.EmptyListItem
          handleAdd={() => {console.error('asdasd');}}
          socketName="Trigger"
          title="Trigger">
          Logic of your app in a cloud in your favorite language
          </Socket.EmptyListItem>
        <Socket.EmptyListItem
          handleAdd={() => {console.error('asdasd');}}
          socketName="Schedule"
          title="Schedule">
          Logic of your app in a cloud in your favorite language
          </Socket.EmptyListItem>
      </div>
    );
  }
});
