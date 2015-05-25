var React = require('react');

//require('../../css/Gate');

module.exports = React.createClass({

  displayName: 'ActivationView',

  render: function() {
    return (
      <div className="login-page" ref="loginPage">
        <div className="login">
          <div className="login-logo">
            <img src="/img/syncano-logo.png" />
          </div>
          <div className="login-content">
            <div className="login-header"> 
              <h1>{this.props.status}</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
});



