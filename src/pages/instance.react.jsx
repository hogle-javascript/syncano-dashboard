var React         = require('react'),
    Router        = require('react-router'),
    RouteHandler  = Router.RouteHandler,

    // Stores and Action
    AuthStore       = require('../apps/Account/AuthStore'),
    AuthActions     = require('../apps/Account/AuthActions'),
    AuthConstants   = require('../apps/Account/AuthConstants');


module.exports = React.createClass({

  displayName: 'Instance',

  mixins: [Router.State, Router.Navigation],

  contextTypes: {
    router: React.PropTypes.func
  },

 componentWillMount: function () {
   if (this.getParams().instanceName) {
      AuthActions.setInstance(this.getParams().instanceName);
   }
 },

  render: function () {
    return (
      <div>
        <RouteHandler />
      </div>
    );
  }

});



