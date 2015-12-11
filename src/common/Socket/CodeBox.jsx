import React from 'react';
import {Styles, Utils} from 'syncano-material-ui';
import SocketWrapper from './SocketWrapper';

export default React.createClass({

  displayName: 'CodeBoxSocket',

  getDefaultProps() {
    return {
      tooltip: 'Create CodeBox'
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
        iconClassName="synicon-socket-codebox"
        style={style}
        iconStyle={Utils.Styles.mergeAndPrefix(styles.iconStyle, iconStyle)}/>
    );
  }
});
