import React from 'react';
import Reflux from 'reflux';

import Actions from './APNSMessagesActions';
import Store from './APNSMessagesStore';

import PushMessagesList from '../PushMessagesList';

export default React.createClass({
  displayName: 'APNSMessagesList',

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
        type="APNS"
        title="iOS Notification History"
        {...this.props}
      />
    );
  }
});
