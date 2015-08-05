import React from 'react';
import Router from 'react-router';

// Stores and Action
export default React.createClass({

  displayName: 'Classes',

  mixins: [
    Router.State,
    Router.Navigation
  ],

  contextTypes: {
    router: React.PropTypes.func
  },

  componentWillMount() {
    console.debug('Classes::componentWillMount');
  },

  render() {
    return (
      <Router.RouteHandler />
    );
  }
});