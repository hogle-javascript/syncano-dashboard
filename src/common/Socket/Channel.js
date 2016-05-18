import React from 'react';
import {Styles, Utils} from 'syncano-material-ui';
import SocketWrapper from './SocketWrapper';

export default React.createClass({
  displayName: 'ChannelSocket',

  getDefaultProps() {
    return {
      tooltip: 'Create a Channel Socket'
    };
  },

  getStyles() {
    return {
      iconStyle: {
        color: Styles.Colors.blue300
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
      <SocketWrapper
        {...other}
        iconClassName="synicon-socket-channel"
        style={style}
        iconStyle={Utils.Styles.mergeStyles(styles.iconStyle, iconStyle)}/>
    );
  }
});
