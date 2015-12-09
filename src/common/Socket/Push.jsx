import React from 'react';
import {Styles} from 'syncano-material-ui';
import SocketWrapper from './SocketWrapper';

export default React.createClass({
  displayName: 'PushSocket',

  render() {
    return (
      <SocketWrapper
        {...this.props}
        iconClassName="synicon-socket-push"
        tooltip="Create Push Socket"
        iconStyle={{color: Styles.Colors.indigo300}}/>
    );
  }
});
