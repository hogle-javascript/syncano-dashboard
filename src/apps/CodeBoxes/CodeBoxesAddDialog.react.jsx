var React               = require('react'),
    Reflux              = require('reflux'),

    // Utils
    ValidationMixin     = require('../../mixins/ValidationMixin'),

    // Stores and Actions
    CodeBoxesActions    = require('./CodeBoxesActions'),
    CodeBoxesStore      = require('./CodeBoxesStore'),

    // Components
    mui                 = require('material-ui'),
    TextField           = mui.TextField,
    DropDownMenu        = mui.DropDownMenu,
    Dialog              = mui.Dialog;


module.exports = React.createClass({

  displayName: 'CodeBoxesAddDialog',

  mixins: [
    Reflux.connect(CodeBoxesStore),
    React.addons.LinkedStateMixin,
    ValidationMixin,
  ],

  validatorConstraints: {
    label: {
      presence: true,
    },
    description: {
      presence: true,
    },

  },

  show: function() {
    this.refs.addCodeBoxDialog.show();
  },

  dismiss: function() {
    this.refs.addCodeBoxDialog.dismiss();
  },


  handleSubmit: function (event) {
    event.preventDefault();

    if (!this.state.canSubmit) {
      return
    }

    this.validate(function(isValid){
      if (isValid === true) {
        this.dismiss();
        CodeBoxesActions.addCodeBox({
          label       : this.state.label,
          description : this.state.description,
          runtime     : this.state.runtimes[this.state.selectedRuntimeIndex].text,
        });
      }
    }.bind(this));
  },

  handleCancel: function(event) {
    this.setState({
      errors: {}});
    this.dismiss();
  },

  renderError: function () {
    if (!this.state.errors || this.state.errors.feedback === undefined) {
      return
    }
    return (
      <div>
        <p>{this.state.errors.feedback}</p>
      </div>
    )
  },

  handleRuntimeChange: function (event, selectedIndex, menuItem){
    this.setState({selectedRuntimeIndex: selectedIndex});
  },


  render: function () {

    var modalState = true;

    var dialogStandardActions = [
      {text: 'Cancel', onClick: this.handleCancel, ref: 'cancel'},
      {text: 'Add CodeBox', onClick: this.handleSubmit, ref: 'submit'}
    ];

    var runtimesMenu = null;
    if (this.state.runtimes) {
      runtimesMenu = <DropDownMenu
        ref               = "runtime"
        name              = "runtime"
        autoWidth         = {true}
        floatingLabelText = "Description of CodeBox"
        style             = {{width:500}}
        selectedIndex     = {this.state.selectedRuntimeIndex}
        onChange          = {this.handleRuntimeChange}
        menuItems         = {this.state.runtimes} />;
    }

    var floatingLabel = {
      color: 'grey',
      fontSize: '16px',
      fontFamily: 'Roboto, sans-serif'
    };

    return (
      <Dialog
        ref="addCodeBoxDialog"
        title="Add CodeBox"
        actions={dialogStandardActions}
        //actionFocus="submit"
        modal={modalState}>
        <div>
        <form
          onSubmit={this.handleSubmit}
          acceptCharset="UTF-8"
          method="post">
        <TextField
            ref="label"
            valueLink={this.linkState('label')}
            errorText={this.getValidationMessages('label').join()}
            name="label"
            style={{width:500}}
            autoComplete="label"
            hintText="Short name for your CodeBox"
            floatingLabelText="Label of CodeBox" />
        <TextField
            ref="description"
            valueLink={this.linkState('description')}
            errorText={this.getValidationMessages('description').join()}
            name="description"
            style={{width:500}}
            className="text-field"
            autoComplete="description"
            multiLine={true}
            hintText="Multiline description of CodeBox (optional)"
            floatingLabelText="Description of CodeBox" />
        <div>
          <label style={(floatingLabel)}>Runtime</label>{runtimesMenu}
        </div>
        </form>
        </div>
      </Dialog>
    );
  }

});

