import React from 'react';
import Reflux from 'reflux';

import Actions from './GCMMessagesActions';
import Store from './GCMMessagesStore';

import PushMessagesList from '../PushMessagesList';

export default React.createClass({
  displayName: 'GCMMessagesList',

  mixins: [Reflux.connect(Store)],

  componentDidMount() {
    Actions.fetch();
  },

  render() {
    const { items, isLoading } = this.state;

    return (
      <PushMessagesList
        isLoading={isLoading}
        items={items}
        type="GCM"
        title="Android Notification History"
        {...this.props}
      />
    );
  }
});
