var React       = require('react');
var classNames  = require('classnames');

var SwitchInput = require('./SwitchInput.react');


module.exports = React.createClass({

  displayName: 'SwitchField',

  handleFieldLinkClick: function() {
    this.props.handleFieldLinkClick(this.props.field.name)
  },

  render: function() {
    var enabled = this.props.field.enabled;
    var textEnabled = <div>{this.props.field.textEnabled} <span className="action-link" onClick={this.handleFieldLinkClick}>{'Change ' + this.props.field.name}</span>.</div>;
    var text = enabled ? textEnabled : this.props.field.textDisabled;
    return (
      <div className="switch-field">
        <div className="switch-field-text">
          <div className="switch-field-heading">{this.props.field.heading}</div>
          <div className="switch-field-description">{text}</div>
        </div>
        <div className="switch-field-input">
          <SwitchInput {...this.props} enabled={enabled} handleClick={this.props.handleSwitchClick} />
        </div>
      </div>
    );
  }
});