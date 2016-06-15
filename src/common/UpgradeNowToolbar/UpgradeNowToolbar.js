import React from 'react';
import {Link} from 'react-router';
import {FlatButton, RaisedButton} from 'material-ui';
import Moment from 'moment';

export default React.createClass({
  displayName: 'UpgradeNowToolbar',

  getInitialState() {
    return {
      shouldDisplay: this.shouldDisplay(),
      isHidden: this.isHidden()
    };
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

  getDayVariant(subscriptionEndDate) {
    const days = Moment(subscriptionEndDate).diff(new Date(), 'days');
    let dayVariant = false;

    // 30, 14, 7, 3, 1 days before
    switch (true) {
      case (days <= 30 && days > 14):
        dayVariant = 30;
        break;
      case (days <= 14 && days > 7):
        dayVariant = 14;
        break;
      case (days <= 7 && days > 3):
        dayVariant = 7;
        break;
      case (days <= 3 && days > 1):
        dayVariant = 3;
        break;
      case (days <= 1):
        dayVariant = 1;
        break;
    }

    return dayVariant;
  },

  getLocalStorageName() {
    const {subscriptionEndDate} = this.props;
    const dayVariant = this.getDayVariant(subscriptionEndDate);
    const localStorageName = `upgradeNowToolbar-${subscriptionEndDate}-${dayVariant}-isHidden`;

    return localStorageName;
  },

  isHidden() {
    const localStorageName = this.getLocalStorageName();
    const localStorageValue = localStorage.getItem(localStorageName) || false;

    return localStorageValue;
  },

  shouldDisplay() {
    const {subscriptionEndDate} = this.props;
    const dayVariant = this.getDayVariant(subscriptionEndDate);

    if (dayVariant) {
      return true;
    }

    return false;
  },

  hide() {
    const localStorageName = this.getLocalStorageName();

    localStorage.setItem(localStorageName, true);
    this.setState({isHidden: true});
  },

  render() {
    const {shouldDisplay, isHidden} = this.state;
    const {subscriptionEndDate} = this.props;
    const styles = this.getStyles();
    const days = Moment(subscriptionEndDate).diff(new Date(), 'days');
    const daysText = days > 1 ? 'days' : 'day';

    if (!shouldDisplay || isHidden) {
      return null;
    }

    return (
      <div style={styles.upgradeNowToolbar}>
        <div style={{padding: '9px 20px'}}>
          <p style={{margin: 0, fontSize: 16}}>
            Your free builder account expires in {days} {daysText}. Please upgrade to keep using Syncano.
          </p>
        </div>
        <div style={{padding: '9px 20px', whiteSpace: 'nowrap'}}>
          <FlatButton
            label="Remind Me Later"
            style={{marginRight: 10}}
            labelStyle={{fontWeight: 500, color: '#fff'}}
            onClick={this.hide}
          />
          <Link to="profile-billing-plan">
            <RaisedButton
              label="Upgrade Now"
              backgroundColor="#FFCC01"
              labelStyle={{fontWeight: 500, color: '#1D2228'}}
              style={{fontWeight: 500}}
            />
          </Link>
        </div>
      </div>
    );
  }
});
