var React         = require('react'),
    Router        = require('react-router'),
    RouteHandler  = Router.RouteHandler,

    // Stores and Action
    SessionStore  = require('../apps/Session/SessionStore'),
    AuthConstants = require('../apps/Account/AuthConstants'),

    // Components
    Header        = require('../apps/Header/Header.react');

module.exports = React.createClass({

  displayName: 'Dashboard',

  mixins: [
    Router.State,
    Router.Navigation
  ],

  contextTypes: {
    router: React.PropTypes.func
  },

  statics: {
    willTransitionTo: function(transition) {
      if (!SessionStore.isAuthenticated()) {
        transition.redirect(AuthConstants.LOGIN_URL, {}, {'next' : transition.path});
      }
    }
  },

  render: function() {
    return (
      <div>
        <Header />
        <RouteHandler />
      </div>
    );
  }

});