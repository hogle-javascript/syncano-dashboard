import React from 'react';
import {withRouter} from 'react-router';
import Helmet from 'react-helmet';

import APNSDevicesActions from '../../src/apps/PushDevices/APNSDevices/APNSDevicesActions';
import GCMDevicesActions from '../../src/apps/PushDevices/GCMDevices/GCMDevicesActions';

import {ListItem, FontIcon, RaisedButton, Styles} from 'syncano-material-ui';
import {Popover} from '../common/';
import {InnerToolbar} from '../common/';

const PushDevicesPage = React.createClass({
  displayName: 'PushDevicesPage',

  contextTypes: {
    params: React.PropTypes.object,
    routes: React.PropTypes.array
  },

  handleAddDevice(type) {
    const addDevice = {
      'apns-devices': APNSDevicesActions.showDialog,
      'gcm-devices': GCMDevicesActions.showDialog
    };

    addDevice[type]();
    this.refs.addDevicePopover.hide();
  },

  handleTouchTapAddIcon(event) {
    const {params, routes} = this.context;
    const {router} = this.props;

    if (router.isActive({name: 'all-push-notification-devices', params}, true) && this.refs.addDevicePopover) {
      this.refs.addDevicePopover.toggle(event);
    } else {
      this.handleAddDevice(routes[routes.length - 1].name);
    }
  },

  render() {
    const {children} = this.props;
    const title = 'Push Notification Devices (BETA)';

    return (
      <div>
        <Helmet title={title} />
        <InnerToolbar title={title}>
          <RaisedButton
            label="Add"
            primary={true}
            style={{marginRight: 0}}
            onTouchTap={this.handleTouchTapAddIcon}/>
          <Popover
            ref="addDevicePopover"
            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            style={{padding: '8px 0'}}>
            <ListItem
              leftIcon={
                <FontIcon
                  color={Styles.Colors.green400}
                  className="synicon-android"
                />
              }
              onTouchTap={() => this.handleAddDevice('gcm-devices')}
              primaryText="Android Device"/>
            <ListItem
              leftIcon={<FontIcon color={Styles.Colors.black} className="synicon-apple"/>}
              onTouchTap={() => this.handleAddDevice('apns-devices')}
              primaryText="iOS Device"/>
          </Popover>
        </InnerToolbar>
        {children}
      </div>
    );
  }
});

export default withRouter(PushDevicesPage);
