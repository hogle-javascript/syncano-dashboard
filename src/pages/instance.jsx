import React from 'react';
import {State, Navigation, RouteHandler} from 'react-router';

// Stores and Action
import SessionStore from '../apps/Session/SessionStore';
import SessionActions from '../apps/Session/SessionActions';
import InstanceDialogActions from '../apps/Instances/InstanceDialogActions';

import Sticky from 'react-stickydiv';
import {List} from 'syncano-material-ui';
import {Sidebar} from '../common';
import HeaderInstancesDropdown from '../common/Header/HeaderInstancesDropdown';
import InstanceDialog from '../apps/Instances/InstanceDialog';

export default React.createClass({

  displayName: 'Instance',

  contextTypes: {
    router: React.PropTypes.func
  },

  mixins: [
    State,
    Navigation
  ],

  componentDidMount() {
    console.debug('Instance::componentWillMount');
    const params = this.getParams();

    if (params.instanceName) {
      SessionActions.fetchInstance(params.instanceName);
    }
  },

  redirectToNewInstance() {
    let instanceName = this.refs.addInstanceDialog.refs.name.getValue();

    SessionActions.fetchInstance(instanceName);
    this.transitionTo('instance', {instanceName});
  },

  render() {
    return (
      <div>
        <div className="row">
          <Sidebar>
            <Sticky offsetTop={50}>
              <HeaderInstancesDropdown />
            </Sticky>
            <Sidebar.List
              key="General"
              subheader="General">
              <Sidebar.LinkListItem
                key="Sockets"
                routeName="sockets"
                primaryText="Sockets"
                initiallyOpen={true}
                iconClassName="synicon-hexagon-outline"
                autoGenerateNestedIndicator={false}
                nestedItems={[
                  <Sidebar.NestedLinkListItem
                    key="Data"
                    routeName="data"
                    primaryText="Data" />,
                  <Sidebar.NestedLinkListItem
                    key="Script"
                    routeName="codeBoxes"
                    primaryText="Script" />,
                  <Sidebar.NestedLinkListItem
                    key="Trigger"
                    routeName="triggers"
                    primaryText="Trigger" />,
                  <Sidebar.NestedLinkListItem
                    key="Schedule"
                    routeName="schedules"
                    primaryText="Schedule" />,
                  <Sidebar.NestedLinkListItem
                    key="Channel"
                    routeName="channels"
                    primaryText="Channel" />

                  /* <Sidebar.NestedLinkListItem
                    key="Push Notification"
                    routeName="push-notification-config"
                    primaryText="Push Notification" /> */
                ]} />
            </Sidebar.List>
            <Sidebar.List
              key="Components"
              subheader="Components">
              <Sidebar.LinkListItem
                key="Users"
                routeName="users"
                iconClassName="synicon-account-multiple"
                primaryText="Users & Groups" />
              <Sidebar.LinkListItem
                key="Classes"
                routeName="classes"
                iconClassName="synicon-layers"
                primaryText="Classes" />
              <Sidebar.LinkListItem
                key="Scripts"
                routeName="scripts"
                iconClassName="synicon-code-tags"
                primaryText="Scripts"/>

              {

              /* <Sidebar.LinkListItem
                key="pushDevices"
                routeName="all-push-notification-devices"
                primaryText="Push Devices"
                iconClassName="synicon-cellphone-iphone"
                initiallyOpen={true}
                autoGenerateNestedIndicator={false}
                nestedItems={[
                  <Sidebar.NestedLinkListItem
                    key="iOSDevices"
                    routeName="apns-devices"
                    primaryText="iOS Devices" />,
                  <Sidebar.NestedLinkListItem
                    key="androidDevices"
                    routeName="gcm-devices"
                    primaryText="Android Devices" />
                ]}/> */
              }
            </Sidebar.List>
            <Sidebar.List
              key="Settings"
              subheader="Settings">
              <Sidebar.ListItem
                key="General"
                iconClassName="synicon-settings"
                primaryText="General"
                onTouchTap={() => InstanceDialogActions.showDialog(SessionStore.getInstance())}/>
              <Sidebar.LinkListItem
                key="Administrators"
                routeName="admins"
                iconClassName="synicon-account-star-variant"
                primaryText="Administrators" />
              <Sidebar.LinkListItem
                key="API keys"
                routeName="api-keys"
                iconClassName="synicon-key-variant"
                primaryText="API keys" />
            </Sidebar.List>
          </Sidebar>
          <div className="col-flex-1" style={{maxWidth: 'calc(100% - 256px)'}}>
            <RouteHandler />
          </div>
        </div>
        <InstanceDialog
          ref="addInstanceDialog"
          handleSubmit={this.redirectToNewInstance}/>
      </div>
    );
  }
});
