import React from 'react';
import {Styles} from 'syncano-material-ui';
import SocketWrapper from './SocketWrapper';

export default React.createClass({

  displayName: 'UsersSocket',

  render() {
    return (
      <SocketWrapper
        {...this.props}
        iconClassName="synicon-socket-users"
        tooltip="Create a Group"
        iconStyle={{color: Styles.Colors.deepPurple300}}/>
    );
  }
});
