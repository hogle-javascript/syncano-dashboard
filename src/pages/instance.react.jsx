var React = require('react'),
  Router = require('react-router'),
  RouteHandler = Router.RouteHandler,

// Stores and Action
  SessionActions = require('../apps/Session/SessionActions');

module.exports = React.createClass({

  displayName: 'Instance',

  mixins: [
    Router.State,
    Router.Navigation
  ],

  contextTypes: {
    router: React.PropTypes.func
  },

  componentWillMount: function () {
    console.debug('Instance::componentWillMount');
    var params = this.getParams();
    if (params.instanceName) {
      SessionActions.fetchInstance(params.instanceName);
    }
  },

  render: function () {
    return <RouteHandler />
  }

});