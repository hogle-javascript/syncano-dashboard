import React from 'react';
import Radium from 'radium';
import _ from 'lodash';
import { colors as Colors } from 'material-ui/styles/';

export default Radium(React.createClass({
  displayName: 'UserInfo',

  getStyles() {
    return {
      base: {
        backgroundColor: Colors.grey100,
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
    if (_.isObject(value)) {
      const typeMap = {
        geopoint: `latitude: ${value.latitude}, longitude: ${value.longitude}`,
        relation: `target: ${value.target}, ids: ${JSON.stringify(value.value)}`,
        reference: `target: ${value.target}, id: ${value.value}`,
        array: JSON.stringify(value),
        file: `url: ${value.value}`,
        default: JSON.stringify(value, null, 2)
      };
      return typeMap[value.type || 'default'];
    }
    if (!value) {
      return 'none';
    }
    return value;
  },

  renderCustomFields() {
    const styles = this.getStyles();
    const { profile } = this.props.user;
    const userProfile = _.omit(profile, 'links');

    const sortUserProfile = (map) => {
      const keys = _.sortBy(_.keys(map), (a) => a);
      const newMap = {};
      _.each(keys, (k) => {
        newMap[k] = map[k];
      });
      return newMap;
    };
    const userInfo = _.map(sortUserProfile(userProfile), (value, key) => {
      return (
        <div style={styles.item}>
          {key}
          <div style={styles.itemValue}>{this.renderContent(value)}</div>
        </div>
       );
    });
    return userInfo;
  },

  render() {
    const styles = this.getStyles();

    return (
      <div style={[styles.base, styles.infoHidden, this.props.visible && styles.infoVisible]}>
        <div style={styles.container}>
          {this.renderCustomFields()}
        </div>
      </div>
    );
  }
}));
