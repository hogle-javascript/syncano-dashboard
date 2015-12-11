import React from 'react';
import {Styles, Utils} from 'syncano-material-ui';
import SocketWrapper from './SocketWrapper';

export default React.createClass({

  displayName: 'ChannelSocket',

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
        tooltip="Create Channel Socket"
        style={style}
        iconStyle={Utils.Styles.mergeAndPrefix(styles.iconStyle, iconStyle)}/>
    );
  }
});
