import React from 'react';

import ChannelsActions from '../Channels/ChannelsActions';
import DataViewsActions from '../Data/DataViewsActions';
import GroupsActions from '../Groups/GroupsActions';
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
      },
      socketDescription: {
        paddingTop: 5,
        color: '#9B9B9B'
      }
    };
  },

  showPushNotificationAddDialog() {
    console.info('EmptyView::showPushNotificationAddDialog');
  },

  render() {
    let styles = this.getStyles();

    return (
      <div style={styles.container}>
        <div style={styles.title}>
          Start building your app here
        </div>
        <div style={styles.subtitle}>
          Pick a functionality you need and start building your API
        </div>
        <Socket.EmptyListItem
          addTooltip="Create a Data View"
          handleAdd={DataViewsActions.showDialog}
          socketName="Data"
          title="Add Data">
          <div style={styles.socketDescription}>
            Place your objects and manage data templates on Syncano.
          </div>
        </Socket.EmptyListItem>
        <Socket.EmptyListItem
          addTooltip="Create a Group"
          handleAdd={GroupsActions.showDialog}
          socketName="Users"
          title="Organize Users & Groups">
          <div style={styles.socketDescription}>
            Create users for your app and assign them to groups.
          </div>
        </Socket.EmptyListItem>
        <Socket.EmptyListItem
          addTooltip="Create a Channel"
          handleAdd={ChannelsActions.showDialog}
          socketName="Channel"
          title="Manage Channels">
          <div style={styles.socketDescription}>
            Get real-time updates to keep your data synchronized.
          </div>
        </Socket.EmptyListItem>
        <Socket.EmptyListItem
          addTooltip="Create a CodeBox"
          handleAdd={CodeBoxesActions.showDialog}
          socketName="CodeBox"
          title="Write CodeBoxes™">
          <div style={styles.socketDescription}>
            Run scripts on our servers and use them for business logic.
          </div>
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
          handleAdd={TriggersActions.showDialog}
          socketName="Trigger"
          title="Configure Triggers">
          <div style={styles.socketDescription}>
            Execute a CodeBox™ when your data is created, updated or deleted.
          </div>
        </Socket.EmptyListItem>
        <Socket.EmptyListItem
          addTooltip="Create a Schedule"
          handleAdd={SchedulesActions.showDialog}
          socketName="Schedule"
          title="Create Schedules">
          <div style={styles.socketDescription}>
            Plan events and run codeboxes at desired times.
          </div>
        </Socket.EmptyListItem>
      </div>
    );
  }
});
