import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';

    // Utils
import HeaderMixin from '../Header/HeaderMixin';
import InstanceTabsMixin from '../../mixins/InstanceTabsMixin';

    // Stores and Actions
import TracesActions from './TracesActions';
import TracesStore from './TracesStore';

    // Components
import Container from '../../common/Container/Container.react';

    // Local components
import TracesList from './TracesList.react';


export default React.createClass({

  displayName: 'Traces',

  propTypes: {
    tracesFor: React.PropTypes.oneOf(['webhook', 'codebox', 'trigger', 'schedule'])
  },

  mixins: [
    Router.State,
    Router.Navigation,

    Reflux.connect(TracesStore),
    HeaderMixin,
    InstanceTabsMixin
  ],

  getDefaultProps() {
    return {
      tracesFor: 'codebox'
    }
  },

  componentDidMount() {
    // TODO: we have to remember to keep names of params with convention like in codeboxes case to keep this working ie. codeboxId, webhookId, triggerId
    let objectId = this.getParams()[this.props.tracesFor + 'Id'];

    TracesActions.setCurrentObjectId(objectId, this.props.tracesFor);
    TracesStore.refreshData();
  },

  render() {
    return (
      <Container>
        <TracesList
          name  = "Traces"
          items = {this.state.traces} />
      </Container>
    );
  }

});
