var React       = require('react');
var classNames  = require('classnames');

var SwitchInput = require('./SwitchInput.react');

require('./SwitchField.css');

module.exports = React.createClass({

  displayName: 'SwitchField',

  propTypes: {
    handleFieldLinkClick: React.PropTypes.func.isRequired,
    handleSwitchClick: React.PropTypes.func.isRequired,
    enabled: React.PropTypes.bool.isRequired,
    textEnabled: React.PropTypes.string.isRequired,
    textDisabled: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    heading: React.PropTypes.string.isRequired,
  },

  handleFieldLinkClick: function() {
    this.props.handleFieldLinkClick()
  },

  render: function() {
    var textEnabled = <div>{this.props.textEnabled} <span className="action-link" onClick={this.handleFieldLinkClick}>{'Change ' + this.props.name}</span>.</div>;
    var text = this.props.enabled ? textEnabled : this.props.textDisabled;
    return (
      <div className="switch-field">
        <div className="switch-field-text">
          <div className="switch-field-heading">{this.props.heading}</div>
          <div className="switch-field-description">{text}</div>
        </div>
        <div className="switch-field-input">
          <SwitchInput 
            handleClick={this.props.handleSwitchClick}
            enabled={this.props.enabled} 
            name={this.props.name}
             />
        </div>
      </div>
    );
  }
});