var React = require('react');

require('./AccountSignup.css');

module.exports = React.createClass({

  displayName: 'AccountSignup',

  render: function () {
    return (
      <div className="signup-page" ref="signupPage">
        Signup
      </div>
    );
  }
});
