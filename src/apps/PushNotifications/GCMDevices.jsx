import React from 'react';
import Radium from 'radium';
import {State, Navigation} from 'react-router';

import Actions from '../Schedules/SchedulesActions';
import Store from '../Schedules/SchedulesStore';

import {Styles} from 'syncano-material-ui';
import {InnerToolbar, Socket, Lists, ColumnList} from '../../common';

let Column = ColumnList.Column;

export default Radium(React.createClass({

  displayName: 'Devices',

  mixins: [
    State,
    Navigation
  ],

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

  handleChangePlatform() {
    let instanceName = this.getParams().instanceName;

    this.transitionTo('apns-devices', {instanceName});
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
            style={styles.platformText}
            onClick={this.handleChangePlatform}>
            iOS
          </span>
          <span style={styles.separator}>|</span>
          <span style={[styles.platformText, styles.platformActive]}>
            Android
          </span>
        </div>
      </div>
    );
  },

  render() {
    let checkedItems = Store.getNumberOfChecked();

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
