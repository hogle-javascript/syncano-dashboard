import React from 'react';
import { withRouter } from 'react-router';

// Stores and Action
import SessionStore from '../apps/Session/SessionStore';
import SessionActions from '../apps/Session/SessionActions';
import InstanceDialogActions from '../apps/Instances/InstanceDialogActions';
import GlobalConfigDialogActions from '../apps/GlobalConfig/GlobalConfigDialogActions';

import { Sidebar } from '../common/';
import HeaderInstancesDropdown from '../common/Header/HeaderInstancesDropdown';
import InstanceDialog from '../apps/Instances/InstanceDialog';
import GlobalConfigDialog from '../apps/GlobalConfig/GlobalConfigDialog';

const Instance = React.createClass({
  displayName: 'Instance',

  componentDidMount() {
    console.debug('Instance::componentWillMount');
    const { params } = this.props;

    if (params.instanceName) {
      SessionActions.fetchInstance(params.instanceName);
    }
  },

  redirectToNewInstance() {
    const { router } = this.props;
    const instanceName = this.refs.addInstanceDialog.refs.name.getValue();

    SessionActions.fetchInstance(instanceName);
    router.push({ name: 'instance', params: { instanceName } });
  },

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div className="row" style={{ display: 'flex', flex: 1 }}>
          <Sidebar>
            <HeaderInstancesDropdown />
            <div style={{ paddingTop: 56 }}>
              <Sidebar.List
                key="General"
                subheader="General"
              >
                <Sidebar.LinkListItem
                  key="Sockets"
                  routeName="sockets"
                  primaryText="Sockets"
                  iconClassName="synicon-hexagon-outline"
                  iconStyle={{ transform: 'rotate(30deg)' }}
                />
              </Sidebar.List>
              <Sidebar.List
                key="Components"
                subheader="Components"
              >
                <Sidebar.LinkListItem
                  key="Users"
                  routeName="users"
                  iconClassName="synicon-account-multiple"
                  primaryText="Users & Groups"
                />
                <Sidebar.LinkListItem
                  key="Classes"
                  routeName="classes"
                  iconClassName="synicon-layers"
                  primaryText="Classes"
                />

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
                      primaryText="Scripts"
                    />,
                    <Sidebar.NestedLinkListItem
                      key="templates"
                      routeName="templates"
                      primaryText="Templates"
                    />
                  ]}
                />

                {/* <Sidebar.LinkListItem
                  key="pushDevices"
                  routeName="all-push-notification-devices"
                  primaryText="Push Devices (BETA)"
                  iconClassName="synicon-cellphone-iphone"
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
                  ]}
                /> */}

                <Sidebar.LinkListItem
                  key="pushNotifications"
                  routeName="all-push-notification-messages"
                  primaryText="Push Notifications (BETA)"
                  iconClassName="synicon-cellphone-iphone"
                  initiallyOpen={true}
                  autoGenerateNestedIndicator={false}
                  nestedItems={[
                    <Sidebar.NestedLinkListItem
                      key="iOSNotifications"
                      routeName="apns-messages"
                      primaryText="iOS Notifications"
                    />,
                    <Sidebar.NestedLinkListItem
                      key="androidNotifications"
                      routeName="gcm-messages"
                      primaryText="Android Notifications"
                    />
                  ]}
                />

              </Sidebar.List>
              <Sidebar.List
                key="Settings"
                subheader="Settings"
              >
                <Sidebar.ListItem
                  key="Instance Settings"
                  iconClassName="synicon-settings"
                  primaryText="Instance Settings"
                  onTouchTap={() => InstanceDialogActions.showDialog(SessionStore.getInstance())}
                />
                <Sidebar.LinkListItem
                  key="backupAndRestore"
                  routeName="full-backups"
                  iconClassName="synicon-backup-restore"
                  primaryText="Backup & Restore"
                />
                <Sidebar.LinkListItem
                  key="Administrators"
                  routeName="admins"
                  iconClassName="synicon-account-star-variant"
                  primaryText="Administrators"
                />
                <Sidebar.LinkListItem
                  key="API Keys"
                  routeName="api-keys"
                  iconClassName="synicon-key-variant"
                  primaryText="API Keys"
                />
                <Sidebar.ListItem
                  key="globalConfig"
                  iconClassName="synicon-earth"
                  primaryText="Global Config"
                  onTouchTap={GlobalConfigDialogActions.showDialog}
                />

              </Sidebar.List>
              {/* eslint-disable no-inline-comments */}
              {/* <Sidebar.LinkListItem
                key="backupAndRestore"
                routeName="all-backups"
                iconClassName="synicon-backup-restore"
                primaryText="Backup & Restore"
                initiallyOpen={true}
                autoGenerateNestedIndicator={false}
                nestedItems={[
                  <Sidebar.NestedLinkListItem
                    key="fullBackups"
                    routeName="full-backups"
                    primaryText="Full Backups" />,
                  <Sidebar.NestedLinkListItem
                    key="partialBackups"
                    routeName="partial-backups"
                    primaryText="Partial Backups" />
                ]}/> */}
            </div>
          </Sidebar>
          <div
            className="col-flex-1"
            style={{ maxWidth: 'calc(100% - 256px)', display: 'flex', flexDirection: 'column' }}
          >
            {this.props.children}
          </div>
        </div>
        <GlobalConfigDialog />
        <InstanceDialog
          ref="addInstanceDialog"
          handleSubmit={this.redirectToNewInstance}
        />
      </div>
    );
  }
});

export default withRouter(Instance);
