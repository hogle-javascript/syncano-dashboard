import React from 'react';
import { withRouter } from 'react-router';
import Helmet from 'react-helmet';

import { InnerToolbar } from '../../common';

const PushMessages = React.createClass({
  displayName: 'PushMessages',

  contextTypes: {
    params: React.PropTypes.object,
    routes: React.PropTypes.array
  },

  render() {
    const { children } = this.props;

    return (
      <div>
        <Helmet title="Push Notifications" />
        <InnerToolbar title="Push Notifications" />
        {children}
      </div>
    );
  }
});

export default withRouter(PushMessages);
