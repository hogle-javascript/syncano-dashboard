var React  = require('react'),
    Reflux = require('reflux'),

    // Utils
    ValidationMixin = require('../../mixins/ValidationMixin'),

    // Stores and Actions
    InstancesActions = require('./InstancesActions'),
    InstancesStore   = require('./InstancesStore'),

    // Components
    mui          = require('material-ui'),
    TextField    = mui.TextField,
    DropDownMenu = mui.DropDownMenu,
    Dialog       = mui.Dialog;


module.exports = React.createClass({

  displayName: 'InstancesAddDialog',

  mixins: [
    Reflux.connect(InstancesStore),
    React.addons.LinkedStateMixin,
    ValidationMixin,
  ],

  validatorConstraints: {
    name: {
      presence: true,
      length: {
        minimum: 5,
      }
    },
    description: {
    },

  },

  show: function() {
    this.refs.createInstanceDialog.show();
  },

  dismiss: function() {
    this.refs.createInstanceDialog.dismiss();
  },

  handleSubmit: function (event) {
    console.info('InstancesAddDialog::handleSubmit');
    event.preventDefault();

    if (!this.state.canSubmit) {
      return
    }

    this.validate(function(isValid){
      console.info('InstancesAddDialog::handleSubmit isValid:', isValid);
      if (isValid === true) {
        this.dismiss();
        InstancesActions.createInstance({
          name       : this.state.name,
          description : this.state.description || "",
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

  render: function () {
    var modalState = true;

    var dialogStandardActions = [
      {text: 'Cancel', onClick: this.handleCancel, ref: 'cancel'},
      {text: 'Create Instance', onClick: this.handleSubmit, ref: 'submit'}
    ];

    return (
      <Dialog
        ref="createInstanceDialog"
        title="Add Instance"
        actions={dialogStandardActions}
        modal={modalState}>
        <div>
        <form
          onSubmit={this.handleSubmit}
          acceptCharset="UTF-8"
          method="post">
        <TextField
            ref="name"
            valueLink={this.linkState('name')}
            errorText={this.getValidationMessages('name').join()}
            name="name"
            style={{width:'100%'}}
            autoComplete="name"
            hintText="Short name for your Instance"
            floatingLabelText="Name of Instance"
            />
        <TextField
            ref="description"
            valueLink={this.linkState('description')}
            errorText={this.getValidationMessages('description').join()}
            name="description"
            style={{width:'100%'}}
            className="text-field"
            autoComplete="description"
            multiLine={true}
            hintText="Multiline description of Instance (optional)"
            floatingLabelText="Description of Instance"
          />
        </form>
        </div>
      </Dialog>
    );
  }

});

