import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';

// Utils
import HeaderMixin from '../Header/HeaderMixin';
import InstanceTabsMixin from '../../mixins/InstanceTabsMixin';

// Stores and Actions
import Store from './TracesStore';
import Actions from './TracesActions';

// Components
import Container from '../../common/Container/Container.react';

// Local components
import TracesList from './TracesList.react';


export default React.createClass({

  displayName: 'Traces',

  propTypes: {
    tracesFor : React.PropTypes.oneOf(['webhook', 'codebox', 'trigger', 'schedule']),
    objectId  : React.PropTypes.number
  },

  mixins: [
    Router.State,

    Reflux.connect(Store),
    HeaderMixin,
    InstanceTabsMixin
  ],

  getDefaultProps() {
    return {
      tracesFor: 'codebox'
    }
  },

  componentDidMount() {
    Actions.setCurrentObjectId(this.props.objectId, this.props.tracesFor);
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
