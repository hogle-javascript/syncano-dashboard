import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';

// Stores & Actions
import Store from '../Traces/TracesStore';

// Components
import Traces from '../Traces';

export default React.createClass({

  displayName: 'TriggerTraces',

  mixins: [
    Router.State,
    Reflux.connect(Store)
  ],

  render() {
    let triggerId = this.getParams().triggerId;

    return (
      <Traces
        objectId={triggerId}
        tracesFor='trigger'/>
    );
  }
});
