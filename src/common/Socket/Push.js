import React from 'react';
import {Styles, Utils} from 'syncano-material-ui';
import SocketWrapper from './SocketWrapper';

export default React.createClass({
  displayName: 'PushSocket',

  getDefaultProps() {
    return {
      tooltip: 'Push Notification Devices list'
    };
  },

  getStyles() {
    return {
      iconStyle: {
        color: Styles.Colors.indigo300
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
        iconClassName="synicon-socket-push"
        style={style}
        iconStyle={Utils.Styles.mergeStyles(styles.iconStyle, iconStyle)}/>
    );
  }
});
