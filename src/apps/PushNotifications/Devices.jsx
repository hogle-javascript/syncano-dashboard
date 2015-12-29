import React from 'react';
import Radium from 'radium';
import Reflux from 'reflux';
import {State, Navigation} from 'react-router';

import Actions from './DevicesActions';
import Store from './DevicesStore';

import {Styles} from 'syncano-material-ui';
import {InnerToolbar, Socket, Lists, ColumnList, Container} from '../../common';
import ListItem from './DevicesListItem';

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

  renderItem(item) {
    return (
      <ListItem
        onIconClick={this.test}
        icon={this.isIOSTabActive() ? 'apple' : 'android'}
        item={item}/>
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
        <Container>
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
              <Column.ColumnHeader columnName="DESC">
                Active
              </Column.ColumnHeader>
              <Column.ColumnHeader columnName="DATE">
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
            <Lists.List
              emptyItemContent="Add a Device"
              items={this.isIOSTabActive() ? this.state.apnsDevices : this.state.gcmDevices}
              renderItem={this.renderItem}/>
          </Lists.Container>
        </Container>
      </div>
    );
  }
}));
