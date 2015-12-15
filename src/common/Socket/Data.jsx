import React from 'react';
import {Styles, Utils} from 'syncano-material-ui';
import SocketWrapper from './SocketWrapper';

export default React.createClass({

  displayName: 'DataSocket',

  getDefaultProps() {
    return {
      tooltip: 'Create Data Socket'
    };
  },

  getStyles() {
    return {
      iconStyle: {
        color: Styles.Colors.green400
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
        iconClassName="synicon-socket-data"
        style={style}
        iconStyle={Utils.Styles.mergeAndPrefix(styles.iconStyle, iconStyle)}/>
    );
  }
});
