var React        = require('react'),
    Reflux       = require('reflux'),
    Router       = require('react-router'),
    Link         = Router.Link,

    AuthStore    = require('./AuthStore'),
    AuthActions  = require('./AuthActions'),
    AuthConstans = require('./AuthConstants'),

    mui          = require('material-ui'),
    Paper        = mui.Paper,
    RaisedButton = mui.RaisedButton,

    Logo         = require('../../common/Logo/Logo.react');


module.exports = React.createClass({

  displayName: 'AccountPasswordUpdate',

  mixins: [
    Reflux.connect(AuthStore),
    Router.State,
    Router.Navigation
  ],

  contextTypes: {
    router: React.PropTypes.func
  },

  getStyles: function() {
    return {
      text: {
        color        : 'rgba(0, 0, 0, 0.54)',
        lineHeight   : '20px',
        textAlign    : 'center',
        padding      : '0 14%'
      },
      button: {
        width        : '100%',
        boxShadow    : 'none',
        marginBottom : 28
      },
      buttonLabel: {
        fontSize     : 16
      }
    }
  },

  handleButtonClick: function() {
    this.transitionTo(AuthConstans.LOGIN_REDIRECT_PATH);
  },

  render: function() {
    var styles = this.getStyles();

    return (
      <div className="account-container" ref="loginPage">
        <div className="account-logo">
          <Link to="login"><Logo className="logo-blue" /></Link>
        </div>
        <Paper className="account-container__content" rounded={false}>
          <div className="account-container__content__header">
            <p className="vm-0-b">Password updated</p>
          </div>
          <div>
            <p
              className = "vm-4-b"
              style     = {styles.text}
            >
              Sweet! Your new password has now been set and you can log in.
            </p>

            <RaisedButton
              style      = {styles.button}
              labelStyle = {styles.buttonLabel}
              label      = "Go to dashboard"
              onClick    = {this.handleButtonClick}
              primary    = {true}
            />
          </div>
        </Paper>
      </div>
    )
  }
});
