var React = require('react');


module.exports = React.createClass({

  displayName: 'AccountActivate',

  render: function() {
    // var params = this.context.router.getCurrentParams();
    return (
      <div>
        ActivateHandler {this.props.params.uid} - {this.props.params.token}
      </div>
    )
  }

});