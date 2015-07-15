var React            = require('react'),
    Router           = require('react-router'),
    RouteHandler     = Router.RouteHandler,

    // Stores and Action
    CodeBoxesActions = require('../apps/CodeBoxes/CodeBoxesActions');

module.exports = React.createClass({

  displayName: 'Instance',

  mixins: [
    Router.State,
    Router.Navigation
  ],

  contextTypes: {
    router: React.PropTypes.func
  },

  componentWillMount: function() {
    console.debug('Instance::componentWillMount');
      CodeBoxesActions.fetch();
  },

  render: function() {
    return <RouteHandler />
  }

});