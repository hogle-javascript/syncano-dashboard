import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router-old';

// Utils
import HeaderMixin from '../Header/HeaderMixin';
import InstanceTabsMixin from '../../mixins/InstanceTabsMixin';

// Stores & Actions
import Store from '../Traces/TracesStore';

// Components
import Traces from '../Traces';

export default React.createClass({

  displayName: 'WebhookTraces',

  mixins: [
    Router.State,

    Reflux.connect(Store),
    HeaderMixin,
    InstanceTabsMixin
  ],

  render() {
    let webhookName = this.getParams().webhookName;

    return (
      <Traces
        objectId={webhookName}
        tracesFor='webhook'/>
    );
  }
});
