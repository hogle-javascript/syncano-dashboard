import React from 'react';

import ChannelsActions from '../Channels/ChannelsActions';
import DataViewsActions from '../Data/DataViewsActions';
import GroupsActions from '../Users/GroupsActions';
import CodeBoxesActions from '../CodeBoxes/CodeBoxesActions';
import TriggersActions from '../Triggers/TriggersActions';
import SchedulesActions from '../Schedules/SchedulesActions';

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
        padding: '20px 0 40px 0'
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

  showCodeBoxAddDialog() {
    CodeBoxesActions.showDialog();
  },

  showPushNotificationAddDialog() {
    console.info('EmptyView::showPushNotificationAddDialog');
  },

  render() {
    let styles = this.getStyles();

    return (
      <div style={styles.container}>
        <div style={styles.title}>
          Start building your app here!
        </div>
        <div style={styles.subtitle}>
          Pick a functionality you need and start building your API.
        </div>
        <Socket.EmptyListItem
          addTooltip="Create a Data View"
          handleAdd={this.showDataViewAddDialog}
          socketName="Data"
          title="Add Data">
          Place your objects and manage data templates on Syncano.
        </Socket.EmptyListItem>
        <Socket.EmptyListItem
          addTooltip="Create a Group"
          handleAdd={this.showGroupAddDialog}
          socketName="Users"
          title="Organize Users & Groups">
          Create users for your app and assign them to groups.
        </Socket.EmptyListItem>
        <Socket.EmptyListItem
          addTooltip="Create a Channel"
          handleAdd={this.showChannelAddDialog}
          socketName="Channel"
          title="Manage Channels">
          Get real-time updates to keep your data synchronized.
        </Socket.EmptyListItem>
        <Socket.EmptyListItem
          addTooltip="Create a CodeBox"
          handleAdd={this.showCodeBoxAddDialog}
          socketName="CodeBox"
          title="Write CodeBoxes™">
          Run scripts on our servers and use them for business logic.
        </Socket.EmptyListItem>

        {/* eslint-disable no-inline-comments */}

        {/* <Socket.EmptyListItem
         addTooltip="Create a Push Notification"
         handleAdd={this.showPushNotificationAddDialog}
         socketName="Push"
         title="Send Push Notifications">
         Instantly message your mobile users with timely and relevant content.
         </Socket.EmptyListItem> */}

        {/* eslint-enable no-inline-comments */}

        <Socket.EmptyListItem
          addTooltip="Create a Trigger"
          handleAdd={this.showTriggerAddDialog}
          socketName="Trigger"
          title="Configure Triggers">
          Execute a CodeBox™ when your data is created, updated or deleted.
        </Socket.EmptyListItem>
        <Socket.EmptyListItem
          addTooltip="Create a Schedule"
          handleAdd={this.showScheduleAddDialog}
          socketName="Schedule"
          title="Create Schedules">
          Plan events and run codeboxes at desired times.
        </Socket.EmptyListItem>
      </div>
    );
  }
});
