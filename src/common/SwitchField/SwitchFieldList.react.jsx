var React       = require('react');
var SwitchField = require('./SwitchField.react');

require('./SwitchField.css');

module.exports = React.createClass({

  displayName: 'SwitchFieldList',

  propTypes: {
    fields: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    handleFieldLinkClick: React.PropTypes.func,
    handleSwitchClick: React.PropTypes.func,
  },

  getSwitchFields: function() {
    var fields = this.props.fields.map(function(field){
      return <SwitchField 
               handleFieldLinkClick={this.props.handleFieldLinkClick}
               handleSwitchClick={this.props.handleSwitchClick} 
               key={field.name} 
               ref={field.name}
               enabled={field.enabled}
               textEnabled={field.textEnabled}
               textDisabled={field.textDisabled}
               name={field.name}
               heading={field.heading} />
    }.bind(this));
    return fields;
  },

  render: function() {
    return (
      <div className="switch-field-list">
        {this.getSwitchFields()}
      </div>
    );
  }
});