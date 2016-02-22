import React from 'react';
import Router from 'react-router';

// Stores and Action
import ScriptsActions from '../apps/Scripts/ScriptsActions';

export default React.createClass({

  displayName: 'ScriptsPage',

  contextTypes: {
    router: React.PropTypes.func
  },

  mixins: [
    Router.State,
    Router.Navigation
  ],

  componentDidMount() {
    console.debug('ScriptsPage::componentDidMount');
    ScriptsActions.fetch();
  },

  render() {
    return <Router.RouteHandler />;
  }
});
