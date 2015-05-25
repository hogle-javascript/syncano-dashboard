var React = require('react');

//var ServerActions = require('../actions/ServerActions');
//var ViewActions = require('../actions/ViewActions');

var FieldList = require('../Field/FieldList.react');
var ButtonGroup = require('../Button/ButtonGroup.react');

require('./Modal.css');

module.exports = React.createClass({

  displayName: 'ModalUpdateObject',

  getDefaultProps: function(){
    return {
      buttons: [{
        type: "flat",
        isDefault: false,
        name: "cancel",
        displayName: "Cancel",
      },{
        type: "flat",
        isDefault: true,
        name: "confirm",
        displayName: "Confirm",
      }]
    }
  },

  getFormData: function() {
    var data = {}
    this.props.data.fields.forEach(function(field){
      data[field.name] = this.refs.fieldList.refs[field.name].refs.input.getDOMNode().textContent;
    }.bind(this));
    return data;
  },

  handleButtonClick: function(actionType) {
    if (actionType === "confirm") {
      ServerActions.updateItem(this.props.modal.itemType, this.props.modal.item, this.getFormData());
    }
    ViewActions.closeModal();
  },

  stopPropagation: function(e) {
    e.stopPropagation();
  },

  render: function() {
    var fields = this.props.data.fields.map(function(field){
      field.displayName = field.name;
      field.value = this.props.modal.item[field.name];
      if (this.props.modal.item[field.name].type === 'datetime') {
        field.value = this.props.modal.item[field.name].value;
      }
      if (typeof this.props.modal.item[field.name] === 'boolean') {
        field.value = this.props.modal.item[field.name].toString();
      }
      return field;
    }.bind(this));
    return (
      <div className="modal modal-update-object" ref="modal" onClick={this.stopPropagation}>
        <div className="modal-header">
          <h1>Update a data object</h1>
        </div>
        <div className="modal-content">
          <FieldList {...this.props} fields={fields} ref="fieldList" />
        </div>
        <div className="modal-footer">
          <ButtonGroup buttons={this.props.buttons} handleClick={this.handleButtonClick} />
        </div>
      </div>
    );
  }
});