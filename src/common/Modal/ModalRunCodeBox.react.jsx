var React         = require('react');

//var ServerActions = require('../actions/ServerActions');
//var ViewActions   = require('../actions/ViewActions');

var FieldList     = require('../Field/FieldList.react');
var ButtonGroup   = require('../Button/ButtonGroup.react');

require('./Modal.css');

module.exports = React.createClass({

  displayName: 'ModalRunCodeBox',

  handleButtonClick: function(actionType) {
    if (actionType === "run") {
      var data = {};
      data.payload = this.refs.fieldList.refs.payload.refs.input.getDOMNode().textContent;
      ServerActions.runCodeBox(this.props.context, data);
    }
    ViewActions.closeModal();
  },

  stopPropagation: function(e) {
    e.stopPropagation();
  },

  render: function() {
    return (
      <div className="modal modal-create-class" ref="modal" onClick={this.stopPropagation}>
        <div className="modal-header">
          <h1>{this.props.modal.title}</h1>
        </div>
        <div className="modal-content">
          <FieldList fields={this.props.modal.fields} ref="fieldList" />
        </div>
        <div className="modal-footer">
          <ButtonGroup buttons={this.props.modal.buttons} handleClick={this.handleButtonClick} />
        </div>
      </div>
    );
  }
});