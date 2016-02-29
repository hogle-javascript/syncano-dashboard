import React from 'react';
import Reflux from 'reflux';
import {State, Navigation} from 'react-router';
import _ from 'lodash';

// Stores & Actions
import Actions from './SocketsActions';
import Store from './SocketsStore';

// Utils
import {DialogsMixin, InstanceTabsMixin} from '../../mixins';
import HeaderMixin from '../Header/HeaderMixin';

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

  displayName: 'Data',

  mixins: [
    State,
    Navigation,

    Reflux.connect(Store, 'sockets'),

    DialogsMixin,
    InstanceTabsMixin,
    HeaderMixin
  ],

  statics: {
    willTransitionFrom(transition, component) {
      if (_.includes(transition.path, 'prolong')) {
        component.refs.prolongDialog.show();
      }
    }
  },

  componentDidMount() {
    console.info('Data::componentDidMount');
    Actions.fetch();
  },

  getPushNotificationItems() {
    const APNSItems = _.filter(this.state.sockets.gcmPushNotifications, 'hasConfig');
    const GCMItems = _.filter(this.state.sockets.apnsPushNotifications, 'hasConfig');

    return APNSItems.concat(GCMItems);
  },

  hasAnyItem() {
    const socketsWithItems = _.keys(this.state.sockets)
      .filter((key) => _.isArray(this.state.sockets[key]) && this.state.sockets[key].length > 0);

    return socketsWithItems.length > 0;
  },

  handleListTitleClick(routeName) {
    let instanceName = this.getParams().instanceName;

    this.transitionTo(routeName, {instanceName});
  },

  initDialogs() {
    let params = this.getParams();

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
    if (!this.hasAnyItem() || this.state.sockets.isLoading) {
      return <InnerToolbar title="Sockets"/>;
    }
    const togglePopover = this.refs.pushSocketPopover ? this.refs.pushSocketPopover.toggle : null;

    return (
      <InnerToolbar title="Sockets">
        <div style={{paddingTop: 4}}>
          <Popover ref="pushSocketPopover"/>
          <Socket.Data onTouchTap={Data.Actions.showDialog}/>
          <Socket.CodeBox onTouchTap={CodeBoxes.Actions.showDialog}/>
          <Socket.Channel onTouchTap={Channels.Actions.showDialog}/>
          <Socket.Push
            tooltip="Configure Push Notification Socket"
            onTouchTap={togglePopover}/>
          <Socket.Trigger onTouchTap={Triggers.Actions.showDialog}/>
          <Socket.Schedule
            onTouchTap={Schedules.Actions.showDialog}
            tooltipPosition="bottom-left"/>
        </div>
      </InnerToolbar>
    );
  },

  renderLists() {
    if (!this.hasAnyItem()) {
      return (
        <Loading show={this.state.sockets.isLoading}>
          <EmptyView />
        </Loading>
      );
    }

    return (
      <div style={{clear: 'both', height: '100%'}}>
        <Loading show={this.state.sockets.isLoading}>
          <Show if={this.state.sockets.data.length > 0}>
            <Data.List
              name="Data Sockets"
              items={this.state.sockets.data}
              handleTitleClick={() => this.handleListTitleClick('data')}
              emptyItemHandleClick={Data.Actions.showDialog}
              emptyItemContent="Create a Data Socket"/>
          </Show>

          <Show if={this.state.sockets.scripts.length > 0}>
            <CodeBoxes.List
              name="Script Sockets"
              items={this.state.sockets.scripts}
              handleTitleClick={() => this.handleListTitleClick('codeBoxes')}
              emptyItemHandleClick={CodeBoxes.Actions.showDialog}
              emptyItemContent="Create a Script Socket"/>
          </Show>

          <Show if={this.state.sockets.triggers.length > 0}>
            <Triggers.List
              name="Trigger Sockets"
              items={this.state.sockets.triggers}
              handleTitleClick={() => this.handleListTitleClick('triggers')}
              emptyItemHandleClick={Triggers.Actions.showDialog}
              emptyItemContent="Create a Trigger Socket"/>
          </Show>

          <Show if={this.state.sockets.schedules.length > 0}>
            <Schedules.List
              name="Schedule Sockets"
              items={this.state.sockets.schedules}
              handleTitleClick={() => this.handleListTitleClick('schedules')}
              emptyItemHandleClick={Schedules.Actions.showDialog}
              emptyItemContent="Create a Schedule Socket"/>
          </Show>

          <Show if={this.state.sockets.channels.length > 0}>
            <Channels.List
              name="Channel Sockets"
              items={this.state.sockets.channels}
              handleTitleClick={() => this.handleListTitleClick('channels')}
              emptyItemHandleClick={Channels.Actions.showDialog}
              emptyItemContent="Create a Channel Socket"/>
          </Show>

          <Show if={this.getPushNotificationItems().length > 0}>
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
