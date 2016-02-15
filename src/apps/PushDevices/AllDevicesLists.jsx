import React from 'react';
import Radium from 'radium';

import APNSDevices from './APNSDevices/APNSDevices';
import GCMDevices from './GCMDevices/GCMDevices';

export default Radium(React.createClass({

  displayName: 'AllDevicesLists',

  getStyles() {
    return {
      GCMList: {
        marginTop: '-90px'
      }
    };
  },

  render() {
    const styles = this.getStyles();

    return (
      <div>
        <APNSDevices visibleItems={3}/>
        <div style={styles.GCMList}>
          <GCMDevices visibleItems={3}/>
        </div>
      </div>
    );
  }
}));
