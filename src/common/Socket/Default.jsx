import React from 'react';
import {Styles} from 'syncano-material-ui';
import SocketWrapper from './SocketWrapper';

export default React.createClass({

  displayName: 'ChannelSocket',

  render() {
    return (
      <SocketWrapper
        {...this.props}
        iconClassName="synicon-plus-circle-outline"
        tooltipPosition="bottom-left"
        iconStyle={{color: Styles.Colors.blue400}}/>
    );
  }
});
