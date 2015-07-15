var React      = require('react'),
    classNames = require('classnames'),

    mui        = require('material-ui'),
    Toggle     = mui.Toggle;

require('./SwitchField.css');

module.exports = React.createClass({

  displayName: 'SwitchField',

  propTypes: {
    handleFieldLinkClick : React.PropTypes.func.isRequired,
    handleSwitchClick    : React.PropTypes.func.isRequired,
    toggled              : React.PropTypes.bool.isRequired,
    textEnabled          : React.PropTypes.string.isRequired,
    textDisabled         : React.PropTypes.string.isRequired,
    name                 : React.PropTypes.string.isRequired,
    heading              : React.PropTypes.string.isRequired
  },

  getInitialState: function() {
    return {
      toggled: this.props.toggled
    };
  },

  handleFieldLinkClick: function() {
    this.props.handleFieldLinkClick()
  },

  handleSwitchClick: function() {
    this.props.handleSwitchClick();
    this.setState({
      toggled: !this.state.toggled
    })
  },

  getText: function() {
    var textEnabled = (
      <div>{this.props.textEnabled}
        <span
          ref       = "changeLink"
          className = "action-link"
          onClick   = {this.handleFieldLinkClick}>
          {' Change ' + this.props.name + '.'}
        </span>
      </div>
    );
    return this.state.toggled ? textEnabled : this.props.textDisabled;
  },

  render: function() {
    return (
      <div className="switch-field">
        <div className="switch-field-text">
          <div className="switch-field-heading">{this.props.heading}</div>
          <div className="switch-field-description">{this.getText()}</div>
        </div>
        <div className="switch-field-input">
          <Toggle
            ref            = "MUIToggle"
            onToggle       = {this.handleSwitchClick}
            defaultToggled = {this.props.toggled}
            name           = {this.props.name}
          />
        </div>
      </div>
    );
  }
});