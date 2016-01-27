import React from 'react';
import Radium from 'radium';
import {State, Navigation} from 'react-router';

import {DialogsMixin} from '../../mixins';

import {Styles} from 'syncano-material-ui';
import {Container, Socket} from 'syncano-components';
import {InnerToolbar} from '../../common';
import DevicesList from './DevicesList';

export default Radium(React.createClass({

  displayName: 'Devices',

  mixins: [
    DialogsMixin,
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

  isIOSTabActive() {
    return this.isActive('apns-devices');
  },

  handleChangePlatform(routeName) {
    let instanceName = this.getParams().instanceName;

    this.transitionTo(routeName, {instanceName});
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
    return (
      <div>
        <InnerToolbar title={this.renderTitle()}>
          <Socket
            tooltip="Add Device"
            onTouchTap={this.props.emptyItemHandleClick}/>
        </InnerToolbar>
        <Container>
          <DevicesList {...this.props} />
        </Container>
      </div>
    );
  }
}));
