import _ from 'lodash';

export default {
  resetDialogState() {
    if (_.isFunction(this.getInitialState)) {
      this.replaceState(this.getInitialState());
    }
  },

  handleCancel(dialogRef) {
    console.debug('DialogMixin::handleCancel');

    let ref = _.isString(dialogRef) ? this.refs[dialogRef] : this.refs.dialog;

    this.dismiss();

    if (!ref.props.avoidResetState) {
      this.resetDialogState();
    }
  },

  handleSuccessfullValidation() {
    console.debug('DialogMixin::handleSuccessfullValidation');

    if (this.hasEditMode()) {
      if (_.isFunction(this.handleEditSubmit)) {
        this.handleEditSubmit();
      }
    } else if (_.isFunction(this.handleAddSubmit)) {
      this.handleAddSubmit();
    }
  },

  hasEditMode() {
    return this.state._dialogMode === 'edit';
  },

  hasAddMode() {
    return this.state._dialogMode === 'add';
  },

  show() {
    this.setState({open: true});
  },

  dismiss() {
    this.setState({open: false});
  }
};
