var React             = require('react'),
    Reflux            = require('reflux'),
    Router            = require('react-router'),

    // Utils
    HeaderMixin       = require('../Header/HeaderMixin'),
    InstanceTabsMixin = require('../../mixins/InstanceTabsMixin'),

    // Stores and Actions
    TracesActions     = require('./TracesActions'),
    TracesStore       = require('./TracesStore'),

    // Components
    Container         = require('../../common/Container/Container.react'),

    // Local components
    TracesList        = require('./TracesList.react');


module.exports = React.createClass({

  displayName: 'Traces',

  mixins: [
    Router.State,
    Router.Navigation,

    Reflux.connect(TracesStore),
    HeaderMixin,
    InstanceTabsMixin
  ],

  componentDidMount: function() {
    var codeboxId = this.getParams().codeboxId;

    TracesActions.setCurrentObjectId(codeboxId);
    this.setState({
      objectId : codeboxId
    });
    TracesStore.refreshData();
  },

  render: function () {
    return (
      <Container>
        <TracesList
          name  = "Traces"
          items = {this.state.traces} />
      </Container>
    );
  }

});