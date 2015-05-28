var React = require('react');

require('./signup.css');

module.exports = React.createClass({

  displayName: 'SignupHandler',

  render: function () {
    return (
      <div className="signup-page" ref="signupPage">
        Signup
      </div>
    );
  }
});
