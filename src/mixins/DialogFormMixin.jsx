var DialogFormMixin = {
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

  show: function() {
    console.log('DialogFormMixin::show');
    this.clearData();

    // When it is "edit" mode, we want to do something in addition
    if (this.props.mode === "edit"){
      if (this.editShow){
        this.editShow()
      }
    }

    this.refs.dialogRef.show();
  },

  dismiss: function() {
    this.refs.dialogRef.dismiss();
  },

  handleCancel: function(event) {
    this.setState({
      errors: {}});
    this.dismiss();
  },

  handleSubmit: function (event) {
    console.info('DialogFormMixin::handleSubmit');
    event.preventDefault();

    if (!this.state.canSubmit) {
      return
    }

    this.validate(function (isValid) {
      console.info('DialogFormMixin::handleSubmit isValid:', isValid);
      if (isValid === true) {

        if (this.props.mode === 'add') {
          this.handleAddSubmit();
        } else if (this.props.mode === 'edit') {
          this.handleEditSubmit();
        }
      }
    }.bind(this));
  },

};

module.exports = DialogFormMixin;