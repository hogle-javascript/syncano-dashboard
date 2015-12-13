import React from 'react';
import {Styles} from 'syncano-material-ui';
import SocketWrapper from './SocketWrapper';

export default React.createClass({

  displayName: 'ScheduleSocket',

  render() {
    return (
      <SocketWrapper
        {...this.props}
        iconClassName="synicon-socket-schedule"
        tooltip="Create a Schedule Socket"
        iconStyle={{color: Styles.Colors.lime400}}/>
    );
  }
});
