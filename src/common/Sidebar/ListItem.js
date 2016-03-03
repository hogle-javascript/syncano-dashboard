import React from 'react';
import {State, Navigation} from 'react-router';
import {ListItem, Utils, FontIcon} from 'syncano-material-ui';

export default React.createClass({
  displayName: 'ListItem',

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  mixins: [
    State,
    Navigation
  ],

  getStyles() {
    return {
      base: {
        fontSize: 14,
        lineHeight: '18px',
        color: '#4a4a4a'
      },
      innerDivStyle: {
        padding: '10px 20px'
      },
      withIcon: {
        padding: '10px 20px 10px 48px'
      },
      iconStyle: {
        fontSize: 18,
        margin: '10px 20px',
        width: 18,
        height: 18,
        left: 0
      },
      nestedListStyle: {
        paddingTop: 0,
        paddingBottom: 0,
        background: 'transparent'
      }
    };
  },

  renderIcon() {
    const styles = this.getStyles();
    const {iconClassName, iconColor} = this.props;

    if (iconClassName) {
      return (
        <FontIcon
          color={iconColor}
          style={styles.iconStyle}
          className={iconClassName} />
      );
    }

    return null;
  },

  render() {
    const styles = this.getStyles();
    const {style, iconClassName, ...other} = this.props;

    return (
      <ListItem
        style={Utils.Styles.mergeStyles(styles.base, style)}
        innerDivStyle={Utils.Styles.mergeStyles(styles.innerDivStyle, iconClassName && styles.withIcon)}
        leftIcon={this.renderIcon()}
        nestedListStyle={styles.nestedListStyle}
        {...other} />
    );
  }
});