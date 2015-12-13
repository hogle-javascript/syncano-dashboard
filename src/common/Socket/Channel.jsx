import React from 'react';
import {Styles} from 'syncano-material-ui';
import SocketWrapper from './SocketWrapper';

export default React.createClass({

  displayName: 'ChannelSocket',

  render() {
    return (
      <SocketWrapper
        {...this.props}
        iconClassName="synicon-socket-channel"
        tooltip="Create a Channel Socket"
        iconStyle={{color: Styles.Colors.blue300}}/>
    );
  }
});
