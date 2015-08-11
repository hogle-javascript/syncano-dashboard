let React = require('react');

require('./Snackbar.css');

module.exports = React.createClass({

  displayName: 'Snackbar',

  componentDidMount: function() {
    setTimeout(function() {
      ViewActions.closeSnackbar();
    }, 5000);
  },

  handleActionClick: function() {
    if (this.props.snackbar.actionType === "undoUpdateInstance") {
      ServerActions.undoUpdateInstance();
      ViewActions.closeSnackbar();
    }
  },

  render: function() {
    return (
      <div className="snackbar" ref="snackbar">
        <div className="snackbar-text no-wrap-ellipsis">{this.props.snackbar.text}</div>
        <div className="snackbar-action" onClick={this.handleActionClick}>{this.props.snackbar.actionText}</div>
      </div>
    );
  }
});
