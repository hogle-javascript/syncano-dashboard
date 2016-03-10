import React from 'react';
import Router from 'react-router';

export default React.createClass({
  displayName: 'Classes',

  contextTypes: {
    router: React.PropTypes.func
  },

  render() {
    return (
      <Router.RouteHandler />
    );
  }
});
