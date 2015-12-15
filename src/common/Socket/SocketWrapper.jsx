import React from 'react';
import {IconButton, Utils} from 'syncano-material-ui';

export default React.createClass({

  displayName: 'SocketWrapper',

  getStyles() {
    return {
      style: {
        padding: 6
      },
      iconStyle: {
        fontSize: 36
      }
    };
  },

  render() {
    const styles = this.getStyles();
    const {
      style,
      iconStyle,
      ...other
    } = this.props;

    return (
      <IconButton
        {...other}
        style={Utils.Styles.mergeAndPrefix(styles.style, style)}
        iconStyle={Utils.Styles.mergeAndPrefix(styles.iconStyle, iconStyle)}
        />
    );
  }
});
