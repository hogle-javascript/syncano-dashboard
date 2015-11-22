import _ from 'lodash';

export default {

  componentWillUpdate(nextProps, nextState) {
    console.debug('DialogMixin::componentWillUpdate');

    if (this.state._dialogVisible === nextState._dialogVisible) {
      return true;
    }

    if (!nextState._dialogVisible) {
      return this.handleCancel();
    }

    if (!this.state._dialogVisible && nextState._dialogVisible) {
      if (_.isFunction(this.handleDialogShow)) {
        this.handleDialogShow();
      }

      return this.refs.dialog.show();
    }
  },

  resetDialogState() {
    if (_.isFunction(this.getInitialState)) {
      this.replaceState(this.getInitialState());
    }
  },

  handleCancel() {
    console.debug('DialogMixin::handleCancel');

    this.refs.dialog.dismiss();

    if (!_.isFunction(this.refs.dialog.props.onDismiss)) {
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
  }
};
