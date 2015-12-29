import React from 'react';
import Radium from 'radium';
import Reflux from 'reflux';
import {State, Navigation} from 'react-router';

import Actions from './PushNotificationsActions';
import Store from './PushNotificationsStore';

import {Styles} from 'syncano-material-ui';
import {InnerToolbar, Socket, Lists, ColumnList} from '../../common';

let Column = ColumnList.Column;

export default Radium(React.createClass({

  displayName: 'Devices',

  mixins: [
    Reflux.connect(Store),
    State,
    Navigation
  ],

  componentWillMount() {
    Actions.fetch();
  },

  getStyles() {
    return {
      toolbarTitleContainer: {
        color: 'rgba(0, 0, 0, .4)',
        display: 'flex',
        flexDirection: 'column',
        fontSize: 16
      },
      toolbarTitle: {
        maxHeight: 20,
        marginTop: '-8px'
      },
      toolbarPlatforms: {
        maxHeight: 20,
        fontSize: 12
      },
      separator: {
        padding: '0 8px'
      },
      platformText: {
        cursor: 'pointer'
      },
      platformActive: {
        color: Styles.Colors.blue400
      }
    };
  },

  isIOSTabActive() {
    return this.isActive('apns-devices');
  },

  handleChangePlatform(routeName) {
    let instanceName = this.getParams().instanceName;

    this.transitionTo(routeName, {instanceName});
  },

  test() {
    console.error('test');
  },

  renderTitle() {
    const styles = this.getStyles();

    return (
      <div style={styles.toolbarTitleContainer}>
        <div style={styles.toolbarTitle}>
          Push Notification Devices
        </div>
        <div style={styles.toolbarPlatforms}>
          <span
            style={[styles.platformText, this.isIOSTabActive() && styles.platformActive]}
            onClick={this.handleChangePlatform.bind(null, 'apns-devices')}>
            iOS
          </span>
          <span style={styles.separator}>|</span>
          <span
            style={[styles.platformText, !this.isIOSTabActive() && styles.platformActive]}
            onClick={this.handleChangePlatform.bind(null, 'gcm-devices')}>
            Android
          </span>
        </div>
      </div>
    );
  },

  render() {
    console.error(this.state.gcmDevices);
    let checkedItems = 5;

    return (
      <div>
        <InnerToolbar title={this.renderTitle()}>
          <Socket
            tooltip="Add Device"
            onTouchTap={this.test}/>
        </InnerToolbar>
        <Lists.Container>
          <ColumnList.Header>
            <Column.ColumnHeader
              primary={true}
              columnName="CHECK_ICON"
              className="col-xs-14">
              Device
            </Column.ColumnHeader>
            <Column.ColumnHeader
              className="col-xs-13"
              columnName="DESC">
              User
            </Column.ColumnHeader>
            <Column.ColumnHeader
              className="col-sm-6"
              columnName="DATE">
              Registered
            </Column.ColumnHeader>
            <Lists.Menu
              checkedItemsCount={checkedItems}
              actions={Actions}>
              <Lists.MenuItem
                singleItemText="Delete a Device"
                multipleItemsText="Delete Devices"
                onTouchTap={this.test}/>
            </Lists.Menu>
          </ColumnList.Header>
        </Lists.Container>
      </div>
    );
  }
}));
