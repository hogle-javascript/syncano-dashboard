import React from 'react';
import {IconButton, Utils} from 'syncano-material-ui';

export default React.createClass({
  displayName: 'SocketWrapper',

  mixins: [Utils.Styles],

  getStyles() {
    return {
      style: {
        marginTop: 4,
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
        style={this.mergeStyles(styles.style, style)}
        iconStyle={this.mergeStyles(styles.iconStyle, iconStyle)} />
    );
  }
});
