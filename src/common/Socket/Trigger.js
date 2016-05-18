import React from 'react';
import {Styles, Utils} from 'syncano-material-ui';
import SocketWrapper from './SocketWrapper';

export default React.createClass({
  displayName: 'TriggerSocket',

  getDefaultProps() {
    return {
      tooltip: 'Create a Trigger Socket'
    };
  },

  getStyles() {
    return {
      iconStyle: {
        color: Styles.Colors.amberA200
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
        iconClassName="synicon-socket-trigger"
        style={style}
        iconStyle={Utils.Styles.mergeStyles(styles.iconStyle, iconStyle)}/>
    );
  }
});
