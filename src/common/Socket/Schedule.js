import React from 'react';
import {Styles, Utils} from 'syncano-material-ui';
import SocketWrapper from './SocketWrapper';

export default React.createClass({
  displayName: 'ScheduleSocket',

  getDefaultProps() {
    return {
      tooltip: 'Create a Schedule Socket'
    };
  },

  getStyles() {
    return {
      iconStyle: {
        color: Styles.Colors.lime400
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
        iconClassName="synicon-socket-schedule"
        style={style}
        iconStyle={Utils.Styles.mergeStyles(styles.iconStyle, iconStyle)}/>
    );
  }
});
