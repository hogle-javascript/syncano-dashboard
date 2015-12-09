import React from 'react';
import {Styles} from 'syncano-material-ui';
import SocketWrapper from './SocketWrapper';

export default React.createClass({

  displayName: 'DataSocket',

  render() {
    return (
      <SocketWrapper
        {...this.props}
        iconClassName="synicon-socket-data"
        tooltip="Create Data Socket"
        iconStyle={{color: Styles.Colors.green300}}/>
    );
  }
});
