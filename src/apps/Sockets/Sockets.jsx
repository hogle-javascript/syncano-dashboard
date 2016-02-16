import React from 'react';
import Reflux from 'reflux';
import {State, Navigation} from 'react-router';
import _ from 'lodash';

// Utils
import {DialogsMixin, InstanceTabsMixin} from '../../mixins';
import HeaderMixin from '../Header/HeaderMixin';

// Components
import {Container, Loading, Socket} from 'syncano-components';
import {InnerToolbar, Dialog} from '../../common';
import {FlatButton, Popover, FontIcon, MenuItem, Styles, Utils} from 'syncano-material-ui';

// Apps
import Data from '../Data';
import Channels from '../Channels';
import Classes from '../Classes';
import Snippets from '../Snippets';
import Schedules from '../Schedules';
import Triggers from '../Triggers';
import CodeBoxes from '../CodeBoxes';
import PushDevices from '../PushDevices';
import PushNotifications from '../PushNotifications';
import EmptyView from './EmptyView';

export default React.createClass({

  displayName: 'Data',

  mixins: [
    State,
    Navigation,

    Reflux.connect(Channels.Store, 'channels'),
    Reflux.connect(Data.Store, 'dataviews'),
    Reflux.connect(Schedules.Store, 'schedules'),
    Reflux.connect(Triggers.Store, 'triggers'),
    Reflux.connect(CodeBoxes.Store, 'codeboxes'),
    Reflux.connect(PushNotifications.APNSStore, 'APNSPushNotifications'),
    Reflux.connect(PushNotifications.GCMStore, 'GCMPushNotifications'),

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

  getInitialState() {
    return {
      popoverVisible: false
    };
  },

  componentDidMount() {
    console.info('Data::componentDidMount');
    this.fetch();
  },

  getStyles() {
    return {
      androidIcon: {
        color: Styles.Colors.green400,
        marginTop: '4px !important'
      },
      appleIcon: {
        color: Styles.Colors.black,
        marginTop: '2px !important'
      },
      disabledIcon: {
        color: Styles.Colors.grey400
      }
    };
  },

  getPushNotificationsItems() {
    const isGCMConfigured = PushNotifications.GCMStore.hasConfig();
    const isAPNSConfigured = PushNotifications.APNSStore.hasConfig();
    const items = [
      isGCMConfigured ? PushNotifications.GCMListItem : null,
      isAPNSConfigured ? PushNotifications.APNSListItem : null
    ];

    return _.compact(items);
  },

  isViewLoading() {
    let loadingStates = _.without(_.keys(this.state), 'APNSPushNotifications', 'GCMPushNotifications').map((key) => {
      if (this.state[key].hasOwnProperty('isLoading')) {
        return this.state[key].isLoading;
      }
    });

    return _.includes(loadingStates, true);
  },

  hasAnyItem() {
    return _.without(_.keys(this.state), 'APNSPushNotifications', 'GCMPushNotifications')
      .filter((socketName) => _.has(this.state[socketName], 'items'))
      .some((socketName) => this.state[socketName].items.length > 0);
  },

  handleListTitleClick(routeName) {
    let instanceName = this.getParams().instanceName;

    this.transitionTo(routeName, {instanceName});
  },

  togglePopover(event) {
    this.setState({
      popoverVisible: !this.state.popoverVisible,
      anchorElement: event.currentTarget
    });
  },

  hidePopover() {
    this.setState({
      popoverVisible: false
    });
  },

  fetch() {
    Data.Actions.fetch();
    Snippets.Actions.fetch();
    Channels.Actions.fetch();
    Classes.Actions.fetch();
    Schedules.Actions.fetch();
    Triggers.Actions.fetch();
    CodeBoxes.Actions.fetch();
    PushDevices.APNSActions.fetch();
    PushDevices.GCMActions.fetch();
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

  configurePushNotification(type) {
    const config = {
      gcm: PushNotifications.GCMActions.showDialog,
      apns: PushNotifications.APNSActions.showDialog
    };

    config[type]();
    this.hidePopover();
  },

  renderPopover() {
    const hasGCMConfig = PushNotifications.GCMStore.hasConfig();
    const hasAPNSConfig = PushNotifications.APNSStore.hasConfig();
    const styles = this.getStyles();
    const androidIcon = (
      <FontIcon
        style={Utils.Styles.mergeStyles(styles.androidIcon, hasGCMConfig && styles.disabledIcon)}
        className="synicon-android"/>
    );
    const appleIcon = (
      <FontIcon
        style={Utils.Styles.mergeStyles(styles.appleIcon, hasAPNSConfig && styles.disabledIcon)}
        className="synicon-apple"/>
    );

    return (
      <Popover
        style={{padding: '8px 0'}}
        onRequestClose={this.hidePopover}
        open={this.state.popoverVisible}
        anchorEl={this.state.anchorElement}
        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}>
        <MenuItem
          disabled={PushNotifications.GCMStore.hasConfig()}
          leftIcon={androidIcon}
          onTouchTap={() => this.configurePushNotification('gcm')}>
          <div>
            Android Device
          </div>
        </MenuItem>
        <MenuItem
          disabled={PushNotifications.APNSStore.hasConfig()}
          leftIcon={appleIcon}
          onTouchTap={() => this.configurePushNotification('apns')}>
          <div>
            iOS Device
          </div>
        </MenuItem>
      </Popover>
    );
  },

  renderToolbar() {
    if (!this.hasAnyItem() || this.isViewLoading()) {
      return <InnerToolbar title="Sockets"/>;
    }

    return (
      <InnerToolbar title="Sockets">
        <div style={{paddingTop: 4}}>
          <Socket.Data onTouchTap={Data.Actions.showDialog}/>
          <Socket.CodeBox onTouchTap={CodeBoxes.Actions.showDialog}/>
          <Socket.Channel onTouchTap={Channels.Actions.showDialog}/>
          <Socket.Push
            ref="pushSocket"
            onTouchTap={this.togglePopover}/>
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
        <Loading show={this.isViewLoading()}>
          <EmptyView />
        </Loading>
      );
    }

    return (
      <div style={{clear: 'both', height: '100%'}}>
        <Loading show={this.isViewLoading()}>
          <Data.List
            name="Data Sockets"
            isLoading={this.state.dataviews.isLoading}
            items={this.state.dataviews.items}
            handleTitleClick={() => this.handleListTitleClick('data')}
            emptyItemHandleClick={Data.Actions.showDialog}
            emptyItemContent="Create a Data Socket"/>

          <CodeBoxes.List
            name="CodeBox Sockets"
            isLoading={this.state.codeboxes.isLoading}
            items={this.state.codeboxes.items}
            handleTitleClick={() => this.handleListTitleClick('codeBoxes')}
            emptyItemHandleClick={CodeBoxes.Actions.showDialog}
            emptyItemContent="Create a CodeBox Socket"/>

          <Triggers.List
            name="Trigger Sockets"
            isLoading={this.state.triggers.isLoading}
            items={this.state.triggers.items}
            handleTitleClick={() => this.handleListTitleClick('triggers')}
            emptyItemHandleClick={Triggers.Actions.showDialog}
            emptyItemContent="Create a Trigger Socket"/>

          <Schedules.List
            name="Schedule Sockets"
            isLoading={this.state.schedules.isLoading}
            items={this.state.schedules.items}
            handleTitleClick={() => this.handleListTitleClick('schedules')}
            emptyItemHandleClick={Schedules.Actions.showDialog}
            emptyItemContent="Create a Schedule Socket"/>

          <Channels.List
            name="Channel Sockets"
            isLoading={this.state.channels.isLoading}
            items={this.state.channels.items}
            handleTitleClick={() => this.handleListTitleClick('channels')}
            emptyItemHandleClick={Channels.Actions.showDialog}
            emptyItemContent="Create a Channel Socket"/>

          <PushNotifications.List
            name="Push Notification Sockets"
            handleTitleClick={() => this.handleListTitleClick('apns-devices')}
            items={this.getPushNotificationsItems()}/>
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

        {this.renderPopover()}
        {this.getDialogs()}
        {this.renderToolbar()}
        <Container>
          {this.renderLists()}
        </Container>
      </div>
    );
  }
});
