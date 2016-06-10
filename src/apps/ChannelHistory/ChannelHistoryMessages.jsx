import React from 'react';
import Reflux from 'reflux';

// Stores & Actions
import Store from './ChannelHistoryStore';

// Components
import ChannelHistory from './ChannelHistory';

export default React.createClass({
  displayName: 'ChannelHistory',

  contextTypes: {
    params: React.PropTypes.object
  },

  mixins: [Reflux.connect(Store)],

  render() {
    const {channelName} = this.context.params;

    return (
      <ChannelHistory channelName={channelName}/>
    );
  }
});
