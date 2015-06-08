var React       = require('react'),
    Router      = require('react-router'),
    Reflux      = require('reflux'),

    AuthStore   = require('./AuthStore'),
    AuthActions = require('./AuthActions'),

    mui             = require('material-ui'),
    Paper           = mui.Paper;

module.exports = React.createClass({

  displayName: 'AccountActivate',

  mixins: [
    Reflux.connect(AuthStore),
    Router.State
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
      <div className="account-container" ref="loginPage">
        <div className="account-logo">
          <img src="/img/syncano-logo.svg" />
        </div>
        <Paper className="account-container__content">
          <div className="account-container__content__header">
            <p className="vm-0-b">{this.state.status}</p>
          </div>
        </Paper>
      </div>
    )
  }
});
