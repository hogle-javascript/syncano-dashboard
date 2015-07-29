import React from 'react';
import Router from 'react-router';

// Stores and Action
import  SessionActions from '../apps/Session/SessionActions';

export default React.createClass({

  displayName: 'Solutions',

  mixins: [
    Router.State,
    Router.Navigation
  ],

  contextTypes: {
    router: React.PropTypes.func
  },

  componentWillMount() {
  },

  render() {
    return <Router.RouteHandler />
  }

});