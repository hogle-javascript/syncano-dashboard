import React from 'react';
import { withRouter } from 'react-router';
import Helmet from 'react-helmet';

import { InnerToolbar } from '../../common';
import { RaisedButton } from 'material-ui';

const PushMessages = React.createClass({
  displayName: 'PushMessages',

  contextTypes: {
    params: React.PropTypes.object
  },

  render() {
    const { children, router, routes } = this.props;
    const { params } = this.context;
    const currentRouteName = routes[routes.length - 1].name;
    const redirectRouteMap = {
      'all-push-notification-messages': 'all-push-notification-devices',
      'gcm-messages': 'gcm-devices',
      'apns-messages': 'apns-devices'
    };

    return (
      <div>
        <Helmet title="Push Notifications" />
        <InnerToolbar title="Push Notifications">
          <RaisedButton
            label="Send Notification"
            primary={true}
            onTouchTap={() => router.push({ name: redirectRouteMap[currentRouteName], params })}
          />

        </InnerToolbar>
        {children}
      </div>
    );
  }
});

export default withRouter(PushMessages);
