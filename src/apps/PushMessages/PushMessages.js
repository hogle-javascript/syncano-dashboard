import React from 'react';
import { withRouter } from 'react-router';
import Helmet from 'react-helmet';
import Reflux from 'reflux';

import APNSDevicesActions from '../PushDevices/APNSDevices/APNSDevicesActions';
import GCMDevicesActions from '../PushDevices/GCMDevices/GCMDevicesActions';
import APNSSendMessagesActions from '../PushDevices/APNSDevices/APNSSendMessagesActions';
import GCMSendMessagesActions from '../PushDevices/GCMDevices/GCMSendMessagesActions';
import APNSDevicesStore from '../PushDevices/APNSDevices/APNSDevicesStore';
import GCMDevicesStore from '../PushDevices/GCMDevices/GCMDevicesStore';

import GCMSendMessageDialog from '../PushDevices/GCMDevices/GCMSendMessageDialog';
import APNSSendMessageDialog from '../PushDevices/APNSDevices/APNSSendMessageDialog';
import { InnerToolbar, Popover } from '../../common';
import { RaisedButton, ListItem, FontIcon } from 'material-ui';
import { colors as Colors } from 'material-ui/styles';

const PushMessages = React.createClass({
  displayName: 'PushMessages',

  contextTypes: {
    params: React.PropTypes.object,
    routes: React.PropTypes.array
  },

  mixins: [
    Reflux.connect(APNSDevicesStore, 'apnsDevices'),
    Reflux.connect(GCMDevicesStore, 'gcmDevices')
  ],

  componentDidMount() {
    APNSDevicesActions.fetch();
    GCMDevicesActions.fetch();
  },

  handleSendMessages(type) {
    const sendMessages = {
      apns: APNSSendMessagesActions.showDialog,
      gcm: GCMSendMessagesActions.showDialog
    };

    sendMessages[type]();
    this.refs.sendMessagePopover.hide();
  },

  handleTouchTapToolbarButtons(event) {
    const { params, routes } = this.context;
    const { router } = this.props;
    const currentRouteName = routes[routes.length - 1].name;

    if (router.isActive({ name: 'all-push-notification-messages', params }, true) && this.refs.sendMessagePopover) {
      this.refs.sendMessagePopover.toggle(event);
    } else {
      this.handleSendMessages(currentRouteName);
    }
  },

  renderSendMessagesButton() {
    const { routes } = this.context;
    const { gcmDevices, apnsDevices } = this.state;
    const hasGCMItems = gcmDevices.items && gcmDevices.items.length;
    const hasAPNSItems = apnsDevices.items && apnsDevices.items.length;
    const disableMap = {
      'all-push-notification-messages': !hasAPNSItems && !hasGCMItems,
      'apns-messages': !hasAPNSItems,
      'gcm-messages': !hasGCMItems
    };

    return (
      <RaisedButton
        disabled={disableMap[routes[routes.length - 1].name]}
        label="Send Notification"
        primary={true}
        style={{ marginRight: 0 }}
        onTouchTap={this.handleTouchTapToolbarButtons}
      />
    );
  },

  render() {
    const { gcmDevices, apnsDevices } = this.state;
    const { children } = this.props;
    const hasGCMItems = gcmDevices.items && gcmDevices.items.length;
    const hasAPNSItems = apnsDevices.items && apnsDevices.items.length;

    return (
      <div>
        <Helmet title="Push Notifications" />
        <GCMSendMessageDialog />
        <APNSSendMessageDialog />
        <InnerToolbar title="Push Notifications">
          {this.renderSendMessagesButton()}
          <Popover
            ref="sendMessagePopover"
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            targetOrigin={{ horizontal: 'right', vertical: 'top' }}
            style={{ padding: '8px 0' }}
          >
            <ListItem
              style={!hasGCMItems && { color: '#AAA' }}
              disabled={!hasGCMItems}
              leftIcon={
                <FontIcon
                  style={{ color: !hasGCMItems ? '#AAA' : Colors.green400 }}
                  className="synicon-android"
                />
              }
              onTouchTap={() => this.handleSendMessages('gcm')}
              primaryText="Android Device"
            />
            <ListItem
              style={!hasAPNSItems && { color: '#AAA' }}
              disabled={!hasAPNSItems}
              leftIcon={
                <FontIcon
                  style={{ color: !hasAPNSItems ? '#AAA' : Colors.black }}
                  className="synicon-apple"
                />
              }
              onTouchTap={() => this.handleSendMessages('apns')}
              primaryText="iOS Device"
            />
          </Popover>

        </InnerToolbar>
        {children}
      </div>
    );
  }
});

export default withRouter(PushMessages);
