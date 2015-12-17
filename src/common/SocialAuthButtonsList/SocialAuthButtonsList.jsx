import React from 'react';
import Radium from 'radium';

import SessionStore from '../../apps/Session/SessionStore';
import AuthActions from '../../apps/Account/AuthActions';
import AuthConstants from '../../apps/Account/AuthConstants';

import {Styles, FontIcon, Divider, List, ListItem} from 'syncano-material-ui';

export default Radium(React.createClass({

  displayName: 'SocialAuthButtonsList',

  getDefaultProps() {
    return {
      mode: 'login'
    };
  },

  getStyles() {
    return {
      list: {
        paddingTop: 0,
        paddingBottom: 0,
        marginBottom: 24,
        border: `1px solid ${Styles.Colors.blue700}`
      },
      listItem: {
        color: Styles.Colors.blue700,
        ':hover': {
          backgroundColor: Styles.Colors.blue700,
          color: '#fff'
        }
      },
      listItemIcon: {
        color: 'inherit',
        transition: 'none',
        left: 12
      },
      listDivider: {
        backgroundColor: Styles.Colors.blue700
      }
    };
  },

  handleSocialSignup(network) {
    SessionStore.setSignUpMode();
    AuthActions.socialLogin(network);
  },

  renderSocialButtons() {
    let styles = this.getStyles();
    let socialNetworksCount = AuthConstants.SOCIAL_NETWORKS.length;
    let lastListItemIndex = socialNetworksCount - 1;
    let buttonLabel = this.props.mode === 'signup' ? 'Sign up with ' : 'Login with ';
    let buttons = [];

    AuthConstants.SOCIAL_NETWORKS.map((network, index) => {
      buttons.push(
        <ListItem
          key={`network-${index}`}
          style={styles.listItem}
          primaryText={buttonLabel + network}
          onTouchTap={this.handleSocialSignup.bind(null, network)}
          leftIcon={<FontIcon
                      style = {styles.listItemIcon}
                      className = {`synicon-${network}`}/>}/>
      );
      if (index < lastListItemIndex) {
        buttons.push(<Divider
          key={`divider-${index}`}
          style={styles.listDivider}/>);
      }
    });

    return buttons;
  },

  render() {
    let styles = this.getStyles();

    return (
      <List style={styles.list}>{this.renderSocialButtons()}</List>
    );
  }
}));
