import React from 'react';
import Router from 'react-router';

// Stores and Action
import CodeBoxesActions from '../apps/CodeBoxes/CodeBoxesActions';

export default React.createClass({

  displayName: 'Instance',

  contextTypes: {
    router: React.PropTypes.func
  },

  mixins: [
    Router.State,
    Router.Navigation
  ],

  componentDidMount() {
    console.debug('Instance::componentDidMount');
    CodeBoxesActions.fetch();
  },

  render() {
    return <Router.RouteHandler />;
  }
});
