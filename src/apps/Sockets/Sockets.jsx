import React from 'react';
import Reflux from 'reflux';
import {State, Navigation} from 'react-router';
import _ from 'lodash';

// Stores & Actions
import Actions from './SocketsActions';
import Store from './SocketsStore';

// Utils
import {DialogsMixin} from '../../mixins';

// Components
import {Container, Loading, Socket, Show} from 'syncano-components';
import {InnerToolbar, Dialog} from '../../common';
import Popover from '../PushNotifications/ConfigPushNotificationsPopover';
import {FlatButton} from 'syncano-material-ui';

// Apps
import Data from '../Data';
import Channels from '../Channels';
import Schedules from '../Schedules';
import Triggers from '../Triggers';
import CodeBoxes from '../CodeBoxes';
import PushNotifications from '../PushNotifications';
import EmptyView from './EmptyView';

export default React.createClass({
  displayName: 'Sockets',

  mixins: [
    State,
    Navigation,

    Reflux.connect(Store, 'sockets'),
    DialogsMixin
  ],

  statics: {
    willTransitionFrom(transition, component) {
      if (_.includes(transition.path, 'prolong')) {
        component.refs.prolongDialog.show();
      }
    }
  },

  componentDidMount() {
    console.info('Sockets::componentDidMount');
    Actions.addSocketsListeners();
    _.debounce(Actions.fetch, 1000)();
  },

  componentWillUnmount() {
    Actions.clearSockets();
    Actions.removeSocketsListeners();
  },

  getPushNotificationItems() {
    const {sockets} = this.state;
    const APNSItems = _.filter(sockets.gcmPushNotifications, 'hasConfig');
    const GCMItems = _.filter(sockets.apnsPushNotifications, 'hasConfig');

    return APNSItems.concat(GCMItems);
  },

  handleListTitleClick(routeName) {
    const instanceName = this.getParams().instanceName;

    this.transitionTo(routeName, {instanceName});
  },

  initDialogs() {
    const params = this.getParams();

    return [
      {
        dialog: Dialog,
        params: {
          key: 'prolongDialog',
          ref: 'prolongDialog',
          avoidResetState: true,
          title: 'Prolong instance lifetime',
          children: `You've canceled the archiving of your instance ${params.instanceName}.
          Close this dialog to continue working with your instance.`,
          actions: (
            <FlatButton
              key="cancel"
              onTouchTap={() => this.handleCancel('prolongDialog')}
              primary={true}
              label="Close"
              ref="cancel"/>
          )
        }
      }
    ];
  },

  renderToolbar() {
    const {sockets} = this.state;
    // const togglePopover = this.refs.pushSocketPopover ? this.refs.pushSocketPopover.toggle : null;

    if (!sockets.hasAnyItem || sockets.isLoading) {
      return <InnerToolbar title="Sockets"/>;
    }

    return (
      <InnerToolbar title="Sockets">
        <div>
          <Popover ref="pushSocketPopover"/>
          <Socket.Data onTouchTap={Data.Actions.showDialog}/>
          <Socket.CodeBox onTouchTap={CodeBoxes.Actions.showDialog}/>
          <Socket.Channel onTouchTap={Channels.Actions.showDialog}/>

          {

            /* <Socket.Push
            tooltip="Configure Push Notification Socket"
            onTouchTap={togglePopover}/> */
          }

          <Socket.Trigger onTouchTap={Triggers.Actions.showDialog}/>
          <Socket.Schedule
            onTouchTap={Schedules.Actions.showDialog}
            tooltipPosition="bottom-left"/>
        </div>
      </InnerToolbar>
    );
  },

  renderLists() {
    const {sockets} = this.state;

    if (!sockets.hasAnyItem && !sockets.isLoading) {
      return (
        <EmptyView />
      );
    }

    return (
      <div style={{clear: 'both', height: '100%'}}>
        <Loading show={sockets.isLoading}>
          <Show if={sockets.data.length}>
            <Data.List
              name="Data Sockets"
              items={sockets.data}
              handleTitleClick={() => this.handleListTitleClick('data')}
              emptyItemHandleClick={Data.Actions.showDialog}
              emptyItemContent="Create a Data Socket"/>
          </Show>

          <Show if={sockets.scripts.length}>
            <CodeBoxes.List
              name="Script Sockets"
              items={sockets.scripts}
              handleTitleClick={() => this.handleListTitleClick('codeBoxes')}
              emptyItemHandleClick={CodeBoxes.Actions.showDialog}
              emptyItemContent="Create a Script Socket"/>
          </Show>

          <Show if={sockets.triggers.length}>
            <Triggers.List
              name="Trigger Sockets"
              items={sockets.triggers}
              handleTitleClick={() => this.handleListTitleClick('triggers')}
              emptyItemHandleClick={Triggers.Actions.showDialog}
              emptyItemContent="Create a Trigger Socket"/>
          </Show>

          <Show if={sockets.schedules.length}>
            <Schedules.List
              name="Schedule Sockets"
              items={sockets.schedules}
              handleTitleClick={() => this.handleListTitleClick('schedules')}
              emptyItemHandleClick={Schedules.Actions.showDialog}
              emptyItemContent="Create a Schedule Socket"/>
          </Show>

          <Show if={sockets.channels.length}>
            <Channels.List
              name="Channel Sockets"
              items={sockets.channels}
              handleTitleClick={() => this.handleListTitleClick('channels')}
              emptyItemHandleClick={Channels.Actions.showDialog}
              emptyItemContent="Create a Channel Socket"/>
          </Show>

          <Show if={this.getPushNotificationItems().length}>
            <PushNotifications.List
              name="Push Notification Sockets"
              handleTitleClick={() => this.handleListTitleClick('push-notification-config')}
              items={this.getPushNotificationItems()}/>
          </Show>
        </Loading>
      </div>
    );
  },

  render() {
    return (
      <div>
        <CodeBoxes.Dialog />
        <Data.Dialog />
        <Schedules.Dialog />
        <Triggers.Dialog />
        <Channels.Dialog />
        <PushNotifications.APNSConfigDialog />
        <PushNotifications.GCMConfigDialog />

        {this.getDialogs()}
        {this.renderToolbar()}
        <Container>
          {this.renderLists()}
        </Container>
      </div>
    );
  }
});
