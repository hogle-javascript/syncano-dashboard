import React from 'react';
import {FlatButton, RaisedButton} from 'material-ui';

export default React.createClass({
  displayName: 'UpgradeNowToolbar',

  getInitialState() {
    return {
      shouldDisplay: this.shouldDisplay(),
      isHidden: this.isHidden()
    };
  },

  shouldDisplay() {
    // is free builder account about to expire?
    return true;
  },

  isHidden() {
    const storedTimestamp = localStorage.getItem('upgradeNowToolbarHideTime') || null;

    if (storedTimestamp) {
      const now = Date.now();
      const timestampDiff = now - storedTimestamp;
      const timestampRequiredDiff = 30000; // 30 seconds

      if (timestampDiff < timestampRequiredDiff) {
        return true;
      }
    }

    return false;
  },

  hide() {
    const now = Date.now();

    localStorage.setItem('upgradeNowToolbarHideTime', now);
    this.setState({isHidden: true});
  },

  getStyles() {
    return {
      upgradeNowToolbar: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        zIndex: 12,
        background: '#0070D3',
        color: '#fff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }
    };
  },

  render() {
    const {children} = this.props;
    const {shouldDisplay, isHidden} = this.state;
    const styles = this.getStyles();

    if (!shouldDisplay || isHidden) {
      return null;
    }

    return (
      <div style={styles.upgradeNowToolbar}>
        <div style={{padding: '9px 20px'}}>
          <p style={{margin: 0, fontSize: 16}}>
            Your free builder account expires in 5 days. Please upgrade to keep using Syncano.
          </p>
        </div>
        <div style={{padding: '9px 20px', whiteSpace: 'nowrap'}}>
          <FlatButton
            label="Remind Me Later"
            style={{marginRight: 10}}
            labelStyle={{fontWeight: 500, color: '#fff'}}
            onClick={this.hide}
          />
          <RaisedButton
            label="Upgrade Now"
            backgroundColor="#FFCC01"
            labelStyle={{fontWeight: 500, color: '#1D2228'}}
            style={{fontWeight: 500}}
          />
        </div>
      </div>
    );
  }
});
