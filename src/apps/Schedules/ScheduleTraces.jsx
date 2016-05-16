import React from 'react';
import Reflux from 'reflux';

// Stores & Actions
import Store from '../Traces/TracesStore';

// Components
import Traces from '../Traces';

export default React.createClass({
  displayName: 'ScheduleTraces',

  mixins: [Reflux.connect(Store)],

  render() {
    const {scheduleId} = this.props.params;

    return (
      <Traces
        objectId={scheduleId}
        tracesFor='schedule'/>
    );
  }
});
