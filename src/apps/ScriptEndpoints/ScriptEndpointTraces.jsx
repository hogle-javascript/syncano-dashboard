import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';

// Stores & Actions
import Store from '../Traces/TracesStore';

// Components
import Traces from '../Traces';

export default React.createClass({
  displayName: 'ScriptEndpointTraces',

  mixins: [
    Router.State,

    Reflux.connect(Store)
  ],

  render() {
    let scriptEndpointName = this.getParams().scriptEndpointName;

    return (
      <Traces
        objectId={scriptEndpointName}
        hasHeaderId={false}
        tracesFor='scriptEndpoint'/>
    );
  }
});
