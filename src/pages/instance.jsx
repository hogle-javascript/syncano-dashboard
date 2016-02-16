import React from 'react';
import {State, Navigation, RouteHandler} from 'react-router';

// Stores and Action
import SessionActions from '../apps/Session/SessionActions';

import Sticky from 'react-stickydiv';
import Header from '../apps/Header';
import {List} from 'syncano-material-ui';
import {Sidebar} from '../common';
import HeaderInstancesDropdown from '../apps/Header/HeaderInstancesDropdown';
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

  componentWillMount() {
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
                autoGenerateNestedIndicator={false}
                nestedItems={[
                  <Sidebar.NestedLinkListItem
                    key="Data"
                    routeName="data"
                    primaryText="Data"
                  />,
                  <Sidebar.NestedLinkListItem
                    key="CodeBox"
                    routeName="codeBoxes"
                    primaryText="CodeBox"
                  />,
                  <Sidebar.NestedLinkListItem
                    key="Trigger"
                    routeName="triggers"
                    primaryText="Trigger"
                  />,
                  <Sidebar.NestedLinkListItem
                    key="Schedule"
                    routeName="schedules"
                    primaryText="Schedule"
                  />,
                  <Sidebar.NestedLinkListItem
                    key="Channel"
                    routeName="channels"
                    primaryText="Channel"
                  />,
                  <Sidebar.NestedLinkListItem
                    key="Push Notifications"
                    routeName="push-notifications"
                    primaryText="Push Notifications"
                  />
                ]}/>
            </Sidebar.List>
            <Sidebar.List
              key="Components"
              subheader="Components">
              <Sidebar.LinkListItem
                key="Users"
                routeName="users"
                primaryText="Users & Groups"/>
              <Sidebar.LinkListItem
                key="Classes"
                routeName="classes"
                primaryText="Classes"/>
              <Sidebar.LinkListItem
                key="Snippets"
                routeName="snippets"
                primaryText="Snippets"/>
              <Sidebar.LinkListItem
                key="pushDevices"
                routeName="all-devices"
                primaryText="Push Devices"
                initiallyOpen={true}
                autoGenerateNestedIndicator={false}
                nestedItems={[
                  <Sidebar.NestedLinkListItem
                    key="iOSDevices"
                    routeName="apns-devices"
                    primaryText="iOS Devices"
                  />,
                  <Sidebar.NestedLinkListItem
                    key="androidDevices"
                    routeName="gcm-devices"
                    primaryText="Android Devices"
                  />
                ]}/>
            </Sidebar.List>
            <Sidebar.List
              key="Settings"
              subheader="Settings">
              <Sidebar.LinkListItem
                key="General"
                routeName="instance-edit"
                primaryText="General"/>
              <Sidebar.LinkListItem
                key="Administrators"
                routeName="admins"
                primaryText="Administrators"/>
              <Sidebar.LinkListItem
                key="API keys"
                routeName="api-keys"
                primaryText="API keys"/>
            </Sidebar.List>
          </Sidebar>
          <div className="col-flex-1">
            <Header />
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
