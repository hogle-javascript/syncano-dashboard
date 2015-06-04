var React         = require('react'),
    Router        = require('react-router'),
    RouteHandler  = Router.RouteHandler,

    // Stores and Action
    AuthStore       = require('../apps/Account/AuthStore'),
    AuthActions     = require('../apps/Account/AuthActions'),
    AuthConstants   = require('../apps/Account/AuthConstants'),

    // Components
    Header          = require('../apps/Header/Header.react');


module.exports = React.createClass({

  displayName: 'Dashboard',

  mixins: [Router.State, Router.Navigation],

  contextTypes: {
    router: React.PropTypes.func
  },

  statics: {
    willTransitionTo: function (transition) {
      if (!AuthStore.data.token) {
        transition.redirect(AuthConstants.LOGIN_URL, {}, {'next' : transition.path});
      }
    },
  },

 componentWillMount: function () {
   if (this.getParams().instanceName) {
      AuthActions.setInstance(this.getParams().instanceName);
   }
 },

  render: function () {
    return (
      <div>
        <Header />
        <RouteHandler />
      </div>
    );
  }

});



