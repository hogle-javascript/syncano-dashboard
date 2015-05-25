var React       = require('react');
var SwitchField = require('./SwitchField.react');

module.exports = React.createClass({

  displayName: 'SwitchFieldList',

  render: function() {
    var fields = this.props.fields.map(function(field){
      return <SwitchField {...this.props} key={field.name} field={field} ref={field.name} />
    }.bind(this));
    return (
      <div className="switch-field-list">
        {fields}
      </div>
    );
  }
});