var React      = require('react');
var classNames = require('classnames');

module.exports = React.createClass({

  displayName: 'SwitchInput',

  handleClick: function() {
    this.props.handleClick(this.props.field.name);
  },

  render: function() {
    var cssClasses = classNames('switch-input', {
      'switch-input-enabled': this.props.enabled,
      'switch-input-disabled': !this.props.enabled,
    });
    return (
      <div className={cssClasses} onClick={this.handleClick}>
        <div className="switch-input-track"></div>
        <div className="switch-input-handle"></div>
      </div>
    );
  }
});