import React from 'react';
import Reflux from 'reflux';

import Actions from './DemoAppsActions';
import Store from './DemoAppsStore';

import DemoAppsList from './DemoAppsList';

export default React.createClass({
  displayName: 'DemoApps',

  mixins: [
    Reflux.connect(Store)
  ],

  componentDidMount() {
    Actions.fetch();
  },

  getStyles() {
    return {
      container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      },
      title: {
        marginTop: 20,
        fontWeight: 500,
        fontSize: 32
      }
    };
  },

  render() {
    const { isLoading, items } = this.state;
    const styles = this.getStyles();

    return (
      <div
        style={styles.container}
        className="vm-3-t align-center"
      >
        <div style={styles.title}>
          Syncano DEMO Apps
        </div>
        <DemoAppsList
          isLoading={isLoading}
          items={items}
        />
      </div>
    );
  }
});
