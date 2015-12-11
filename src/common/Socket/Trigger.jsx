import React from 'react';
import {Styles, Utils} from 'syncano-material-ui';
import SocketWrapper from './SocketWrapper';

export default React.createClass({

  displayName: 'TriggerSocket',

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
        tooltip="Create Trigger Socket"
        style={style}
        iconStyle={Utils.Styles.mergeAndPrefix(styles.iconStyle, iconStyle)}/>
    );
  }
});
