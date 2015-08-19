import React from 'react';
import Router from 'react-router';

// Stores and Action
import CodeBoxesActions from '../apps/CodeBoxes/CodeBoxesActions';

export default React.createClass({

  displayName: 'Instance',

  mixins: [
    Router.State,
    Router.Navigation
  ],

  contextTypes: {
    router: React.PropTypes.func
  },

  componentDidMount() {
    console.debug('Instance::componentDidMount');
    CodeBoxesActions.fetch();
  },

  render() {
    return <Router.RouteHandler />
  }

});
