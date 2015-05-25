var React = require('react');

var Field = require('./Field.react');
var FieldSelect = require('./FieldSelect.react');
var FieldPassword = require('./FieldPassword.react');
var FieldReadonly = require('./FieldReadonly.react');
var FieldDatetime = require('./FieldDatetime.react');

module.exports = React.createClass({

  displayName: 'FieldList',

  getDefaultProps: function () {
    return {
      errorFields: []
    }
  },

  render: function () {
    var fields = this.props.fields.map(function (field) {
      var errorText = field.name in this.props.errorFields ? this.props.errorFields[field.name][0] : null;
      if (field.type === "select") {
        return <FieldSelect {...this.props} key={field.name} field={field} ref={field.name} errorText={errorText}/>
      } else if (field.type === "password") {
        return <FieldPassword {...this.props} key={field.name} field={field} ref={field.name} errorText={errorText}/>
      } else if (field.type === "readonly") {
        return <FieldReadonly key={field.name} field={field} ref={field.name}/>
      } else if (field.type === "datetime") {
        return <FieldDatetime key={field.name} ref={field.name} field={field}/>
      } else {
        return <Field key={field.name} field={field} ref={field.name} errorText={errorText}/>
      }
    }.bind(this));
    return (
      <div className="field-list">
        {fields}
      </div>
    );
  }
});