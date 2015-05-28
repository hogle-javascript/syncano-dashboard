var React = require('react');


module.exports = React.createClass({

  displayName: 'PasswordResetConfirm',

  render: function() {
    // var params = this.context.router.getCurrentParams();
    return (
      <div>
        PasswordResetConfirm {this.props.params.uid} - {this.props.params.token}
      </div>
    )
  }

});