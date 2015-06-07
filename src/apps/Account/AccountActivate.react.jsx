var React       = require('react'),
    Router      = require('react-router'),
    Reflux      = require('reflux'),

    AuthStore   = require('./AuthStore'),
    AuthActions = require('./AuthActions');


module.exports = React.createClass({

  displayName: 'AccountActivate',

  mixins: [
    Reflux.connect(AuthStore),
    Router.State,
  ],

  contextTypes: {
    router: React.PropTypes.func
  },

  componentDidMount: function () {
    var params = this.getParams();
    AuthActions.activate({
      uid: params.uid,
      token: params.token
    });
  },

  render: function() {
    return (
      <div className="login-page" ref="loginPage">
        <div className="login">
          <div className="login-logo">
            <img src="/img/syncano-logo.png" />
          </div>
          <div className="login-content">
            <div className="login-header">
              <h1>{this.state.status}</h1>
            </div>
          </div>
        </div>
      </div>
    )
  }

});