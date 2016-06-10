import React from 'react';
import Reflux from 'reflux';

// Stores & Actions
import Store from '../Traces/TracesStore';

// Components
import Traces from '../Traces';

export default React.createClass({
  displayName: 'ScriptEndpointTraces',

  mixins: [Reflux.connect(Store)],

  render() {
    const {scriptEndpointName} = this.props.params;

    return (
      <Traces
        objectId={scriptEndpointName}
        hasHeaderId={false}
        tracesFor='scriptEndpoint'/>
    );
  }
});
