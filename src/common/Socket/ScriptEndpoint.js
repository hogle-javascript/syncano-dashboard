import React from 'react';
import {Styles, Utils} from 'syncano-material-ui';
import SocketWrapper from './SocketWrapper';

export default React.createClass({
  displayName: 'ScriptSocket',

  getDefaultProps() {
    return {
      tooltip: 'Create a Script Endpoint'
    };
  },

  getStyles() {
    return {
      iconStyle: {
        color: Styles.Colors.red300
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
        iconClassName="synicon-socket-script-endpoint"
        style={style}
        iconStyle={Utils.Styles.mergeStyles(styles.iconStyle, iconStyle)}/>
    );
  }
});
