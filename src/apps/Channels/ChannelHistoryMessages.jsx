import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';

// Utils
import HeaderMixin from '../Header/HeaderMixin';
import {InstanceTabsMixin} from '../../mixins';

// Stores & Actions
import Store from './ChannelHistoryStore';

// Components
import ChannelHistory from './ChannelHistory';

export default React.createClass({

  displayName: 'TriggerTraces',

  mixins: [
    Router.State,

    Reflux.connect(Store),
    HeaderMixin,
    InstanceTabsMixin
  ],

  render() {
    let channelName = this.getParams().channelName;

    return (
      <ChannelHistory
        objectId={channelName}
        tracesFor='channel'/>
    );
  }
});
