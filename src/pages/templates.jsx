import React from 'react';
import Router from 'react-router';

// Stores and Action
import TemplatesActions from '../apps/Templates/TemplatesActions';

export default React.createClass({

  displayName: 'TemplatesPage',

  contextTypes: {
    router: React.PropTypes.func
  },

  mixins: [
    Router.State,
    Router.Navigation
  ],

  componentDidMount() {
    console.debug('TemplatesPage::componentDidMount');
    TemplatesActions.fetch();
  },

  render() {
    return <Router.RouteHandler />;
  }
});
