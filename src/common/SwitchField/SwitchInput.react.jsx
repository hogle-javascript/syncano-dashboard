let React = require('react');
let classNames = require('classnames');

require('./SwitchField.css');

module.exports = React.createClass({

  displayName: 'SwitchInput',

  propTypes: {
    handleClick: React.PropTypes.func.isRequired,
    enabled: React.PropTypes.func.isRequired,
  },

  getInitialState() {
    return {
      enabled: this.props.enabled,
    };
  },

  handleClick: function() {
    this.props.handleClick();
    this.setState({
      enabled: !this.state.enabled,
    });
  },

  render: function() {
    let cssClasses = classNames('switch-input', {
      'switch-input-enabled': this.state.enabled,
      'switch-input-disabled': !this.state.enabled,
    });
    return (
      <div className={cssClasses} onClick={this.handleClick}>
        <div className="switch-input-track"></div>
        <div className="switch-input-handle"></div>
      </div>
    );
  }
});