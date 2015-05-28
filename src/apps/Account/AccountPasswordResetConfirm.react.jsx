var React = require('react');


module.exports = React.createClass({

  displayName: 'AccountPasswordResetConfirm',

  render: function() {
    return (
      <div>
        PasswordResetConfirm {this.props.params.uid} - {this.props.params.token}
      </div>
    )
  }

});