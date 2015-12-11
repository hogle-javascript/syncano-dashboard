import React from 'react';
import {Styles} from 'syncano-material-ui';
import SocketWrapper from './SocketWrapper';

export default React.createClass({

  displayName: 'CodeBoxSocket',

  render() {
    return (
      <SocketWrapper
        {...this.props}
        iconClassName="synicon-socket-codebox"
        tooltip="Create CodeBox Socket"
        iconStyle={{color: Styles.Colors.red300}}/>
    );
  }
});
