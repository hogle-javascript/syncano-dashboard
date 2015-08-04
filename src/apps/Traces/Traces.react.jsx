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
    tracesFor: React.PropTypes.oneOf(['webhook', 'codebox', 'trigger', 'schedule']),
    objectId: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string])
  },

  mixins: [
    Router.State,

    Reflux.connect(Store),
    HeaderMixin,
    InstanceTabsMixin
  ],

  getDefaultProps() {
    return {
      tracesFor: 'codebox',
      showHeader: false
    }
  },

  componentDidMount() {
    Actions.setCurrentObjectId(this.props.objectId, this.props.tracesFor);
  },

  render() {
    let headerText = this.props.showHeader ? this.props.tracesFor.charAt(0).toUpperCase() +
    this.props.tracesFor.slice(1) + ': ' + this.props.objectId : null;

    return (
      <Container.Profile headerText={headerText}>
        <TracesList
          tracesFor={this.props.tracesFor}
          name="Traces"
          items={this.state.traces}/>
      </Container.Profile>
    );
  }
});
