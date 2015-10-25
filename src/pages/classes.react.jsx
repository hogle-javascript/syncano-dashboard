import React from 'react';
import Router from 'react-router-old';

// Stores and Action
export default React.createClass({

  displayName: 'Classes',

  contextTypes: {
    router: React.PropTypes.func
  },

  mixins: [
    Router.State,
    Router.Navigation
  ],

  render() {
    return (
      <Router.RouteHandler />
    );
  }
});
