import React from 'react';
import Radium from 'radium';

import {Styles, FontIcon, ListItem} from 'syncano-material-ui';

export default Radium(React.createClass({
  displayName: 'SocialAuthButtonsList',

  getDefaultProps() {
    return {
      mode: 'login'
    };
  },

  getStyles() {
    return {
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
      }
    };
  },

  renderIcon() {
    let styles = this.getStyles();

    return (
      <FontIcon
        style={styles.listItemIcon}
        className={`synicon-${this.props.network}`}/>
    );
  },

  render() {
    let styles = this.getStyles();
    let {network, onTouchTap} = this.props;
    let buttonLabel = this.props.mode === 'signup' ? 'Sign up with ' : 'Login with ';

    return (
      <ListItem
        style={styles.listItem}
        primaryText={buttonLabel + network}
        onTouchTap={onTouchTap}
        leftIcon={this.renderIcon()}/>
    );
  }
}));
