import React from 'react';
import {Styles} from 'syncano-material-ui';
import SocketWrapper from './SocketWrapper';

export default React.createClass({

  displayName: 'UserSocket',

  render() {
    return (
      <SocketWrapper
        {...this.props}
        iconClassName="synicon-socket-user"
        tooltip="Create a User"
        iconStyle={{color: Styles.Colors.deepPurple300}}/>
    );
  }
});
