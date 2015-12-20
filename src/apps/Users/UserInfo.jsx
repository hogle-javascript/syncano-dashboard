import React from 'react';
import Radium from 'radium';
import pluralize from 'pluralize';
import {Styles} from 'syncano-material-ui';

export default Radium(React.createClass({

  displayName: 'UserInfo',

  getStyles() {
    return {
      base: {
        backgroundColor: Styles.Colors.grey100,
        borderRight: '1px solid #DDD',
        borderLeft: '1px solid #DDD',
        color: '#9B9B9B'
      },
      infoVisible: {
        maxHeight: '500px',
        transition: 'max-height 450ms ease-in',
        overflow: 'auto',
        borderBottom: '1px solid #DDD'
      },
      infoHidden: {
        maxHeight: 0,
        overflow: 'hidden',
        transition: 'max-height 450ms ease-out'
      },
      container: {
        padding: 20
      },
      item: {
        paddingBottom: 10
      },
      itemValue: {
        color: '#777',
        fontWeight: 600
      }
    };
  },

  renderContent(value) {
    if (!value) {
      return 'none';
    }
    return value;
  },

  render() {
    let styles = this.getStyles();
    let user = this.props.user;

    return (
      <div style={[styles.base, styles.infoHidden, this.props.visible && styles.infoVisible]}>
        <div
          style={styles.container}>
          <div style={styles.item}>
            User key:
            <div style={styles.itemValue}>{user.user_key}</div>
          </div>
          <div style={styles.item}>
            Group permissions:
            <div style={styles.itemValue}>{this.renderContent(user.profile.group_permissions)}</div>
          </div>
          <div style={styles.item}>
            Other permissions:
            <div style={styles.itemValue}>{this.renderContent(user.profile.other_permissions)}</div>
          </div>
          <div style={styles.item}>
            Owner permissions:
            <div style={styles.itemValue}>{this.renderContent(user.profile.owner_permissions)}</div>
          </div>
          <div style={styles.item}>
            {pluralize('Revision', user.profile.revision)}:
            <div style={styles.itemValue}>{user.profile.revision}</div>
          </div>
          <div style={styles.item}>
            Channel:
            <div style={styles.itemValue}>{this.renderContent(user.profile.channel)}</div>
          </div>
          <div style={styles.item}>
            Channel room:
            <div style={styles.itemValue}>{this.renderContent(user.profile.channel_room)}</div>
          </div>
        </div>
      </div>
    );
  }
}));
