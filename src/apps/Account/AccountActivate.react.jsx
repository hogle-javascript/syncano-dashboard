var React       = require('react'),
    Reflux      = require('reflux'),
    Router      = require('react-router'),
    Link        = Router.Link,

    AuthStore   = require('./AuthStore'),
    AuthActions = require('./AuthActions'),

    mui         = require('material-ui'),
    Paper       = mui.Paper,
    Logo        = require('../../common/Logo');


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
          <Link to="login"><Logo className="logo-blue" /></Link>
        </div>
        <Paper className="account-container__content" rounded={false}>
          <div className="account-container__content__header">
            <p className="vm-0-b">{this.state.status}</p>
          </div>
        </Paper>
      </div>
    )
  }
});
