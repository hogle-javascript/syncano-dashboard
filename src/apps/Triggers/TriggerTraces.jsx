import React from 'react';
import Reflux from 'reflux';

// Stores & Actions
import Store from '../Traces/TracesStore';

// Components
import Traces from '../Traces';

export default React.createClass({
  displayName: 'TriggerTraces',

  contextTypes: {
    params: React.PropTypes.object
  },

  mixins: [Reflux.connect(Store)],

  render() {
    const {triggerId} = this.context.params;

    return (
      <Traces
        objectId={triggerId}
        tracesFor='trigger'/>
    );
  }
});
