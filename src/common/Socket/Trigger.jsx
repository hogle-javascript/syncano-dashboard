import React from 'react';
import {Styles} from 'syncano-material-ui';
import SocketWrapper from './SocketWrapper';

export default React.createClass({
  displayName: 'TriggerSocket',

  render() {
    return (
      <SocketWrapper
        {...this.props}
        iconClassName="synicon-socket-trigger"
        tooltip="Create Trigger Socket"
        iconStyle={{color: Styles.Colors.amberA200}}/>
    );
  }
});
