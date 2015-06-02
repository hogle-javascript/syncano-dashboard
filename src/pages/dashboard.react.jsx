var React         = require('react'),
    Router        = require('react-router'),
    RouteHandler  = Router.RouteHandler,

    Header        = require('../apps/Header/Header.react'),
    AuthStore     = require('../apps/Account/AuthStore'),
    AuthConstants = require('../apps/Account/AuthConstants');


module.exports = React.createClass({

  displayName: 'Dashboard',

  statics: {
    willTransitionTo: function (transition) {
      if (AuthStore.getState().token === null) {
        transition.redirect(AuthConstants.LOGIN_URL, {}, {'next' : transition.path});
      }
    },
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



