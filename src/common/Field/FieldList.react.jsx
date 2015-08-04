let React = require('react');

let Field = require('./Field.react');
let FieldSelect = require('./FieldSelect.react');
let FieldPassword = require('./FieldPassword.react');
let FieldReadonly = require('./FieldReadonly.react');
let FieldDatetime = require('./FieldDatetime.react');

module.exports = React.createClass({

  displayName: 'FieldList',

  getDefaultProps() {
    return {
      errorFields: []
    }
  },

  render() {
    let fields = this.props.fields.map(function(field) {
      let errorText = field.name in this.props.errorFields ? this.props.errorFields[field.name][0] : null;
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