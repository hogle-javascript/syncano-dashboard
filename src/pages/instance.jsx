import React from 'react';
import {State, Navigation, RouteHandler} from 'react-router';

// Stores and Action
import SessionStore from '../apps/Session/SessionStore';
import SessionActions from '../apps/Session/SessionActions';
import InstanceDialogActions from '../apps/Instances/InstanceDialogActions';

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
      <div style={{display: 'flex', flexDirection: 'column', flex: 1}}>
        <div className="row" style={{display: 'flex', flex: 1}}>
          <Sidebar>
            <HeaderInstancesDropdown />
            <div style={{paddingTop: 56}}>
              <Sidebar.List
                key="General"
                subheader="General">
                <Sidebar.LinkListItem
                  key="Sockets"
                  routeName="sockets"
                  primaryText="Sockets"
                  iconClassName="synicon-hexagon-outline"
                  iconStyle={{transform: 'rotate(30deg)'}} />
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
                  key="Snippets"
                  routeName="snippets"
                  primaryText="Snippets"
                  iconClassName="synicon-code-tags"
                  initiallyOpen={true}
                  autoGenerateNestedIndicator={false}
                  nestedItems={[
                    <Sidebar.NestedLinkListItem
                      key="scripts"
                      routeName="scripts"
                      primaryText="Scripts" />,
                    <Sidebar.NestedLinkListItem
                      key="templates"
                      routeName="templates"
                      primaryText="Templates" />
                  ]}/>

                <Sidebar.LinkListItem
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
                  ]}/>

              </Sidebar.List>
              <Sidebar.List
                key="Settings"
                subheader="Settings">
                <Sidebar.ListItem
                  key="Instance Settings"
                  iconClassName="synicon-settings"
                  primaryText="Instance Settings"
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
            </div>
          </Sidebar>
          <div
            className="col-flex-1"
            style={{maxWidth: 'calc(100% - 256px)', display: 'flex', flexDirection: 'column'}}>
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
