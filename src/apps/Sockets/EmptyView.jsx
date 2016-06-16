import React from 'react';

import ChannelsActions from '../Channels/ChannelsActions';
import DataEndpointsActions from '../DataEndpoints/DataEndpointsActions';
import ScriptEndpointsActions from '../ScriptEndpoints/ScriptEndpointsActions';
import TriggersActions from '../Triggers/TriggersActions';
import SchedulesActions from '../Schedules/SchedulesActions';
import { APNSActions, GCMActions } from '../PushNotifications';
import SocketsStore from './SocketsStore';

import EmptyListItem from './EmptyListItem';

export default React.createClass({
  displayName: 'SocketsEmpty',

  getStyles() {
    return {
      titleContainer: {
        paddingBottom: 50
      },
      title: {
        textAlign: 'center',
        fontSize: 25,
        lineHeight: '34px',
        fontWeight: 500,
        color: '#4a4a4a',
        marginBottom: 10
      },
      subtitle: {
        textAlign: 'center',
        fontSize: 18,
        lineHeight: '25px',
        color: '#4a4a4a'
      },
      listContainer: {
        maxWidth: 744,
        margin: '0 auto'
      },
      socketDescription: {
        paddingTop: 5,
        color: '#9B9B9B'
      }
    };
  },

  render() {
    const styles = this.getStyles();

    return (
      <div>
        <div style={styles.titleContainer}>
          <div style={styles.title}>
            Start building your app here
          </div>
          <div style={styles.subtitle}>
            Pick the functionality you need and start building your API
          </div>
        </div>
        <div style={styles.listContainer}>
          <EmptyListItem
            handleCreate={DataEndpointsActions.showDialog}
            socketName="DataEndpoint"
            title="Data Endpoint"
            description="Place your objects and manage how your data is returned from Syncano."
          />

          <EmptyListItem
            handleCreate={ScriptEndpointsActions.showDialog}
            socketName="ScriptEndpoint"
            title="Script Endpoint"
            description="Run Scripts on our servers and use them for business logic."
          />

          <EmptyListItem
            handleCreate={TriggersActions.showDialog}
            socketName="Trigger"
            title="Trigger"
            description="Execute a Script when your data is created, updated or deleted."
          />

          <EmptyListItem
            handleCreate={SchedulesActions.showDialog}
            socketName="Schedule"
            title="Schedule"
            description="Plan events and run Scripts at desired times."
          />

          <EmptyListItem
            handleCreate={ChannelsActions.showDialog}
            socketName="Channel"
            title="Channel"
            description="Get real-time updates to keep your data synchronized."
          />

          <EmptyListItem
            handleCreate={APNSActions.showDialog}
            label={SocketsStore.hasAPNSConfig() ? 'Edit' : 'Add'}
            socketName="Push"
            title="APNS Push Notifications (BETA)"
            description="Instantly message your mobile users with timely and relevant content."
          />

          <EmptyListItem
            handleCreate={GCMActions.showDialog}
            label={SocketsStore.hasGCMConfig() ? 'Edit' : 'Add'}
            socketName="Push"
            title="GCM Push Notifications (BETA)"
            description="Instantly message your mobile users with timely and relevant content."
          />
        </div>
      </div>
    );
  }
});
