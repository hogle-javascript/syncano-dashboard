import _ from 'lodash';

export default {

  componentWillUpdate(nextProps, nextState) {
    console.debug('DialogMixin::componentWillUpdate');

    if (this.state._dialogVisible === nextState._dialogVisible) {
      return true;
    }

    if (nextState._dialogVisible === false) {
      return this.refs.dialog.dismiss();
    }

    if (!this.state._dialogVisible && nextState._dialogVisible) {
      if (_.isFunction(this.handleDialogShow)) {
        this.handleDialogShow();
      }
      return this.refs.dialog.show();
    }
  },

  resetDialogState() {
    if (typeof this.getInitialState === 'function') {
      this.replaceState(this.getInitialState());
    }
  },

  handleCancel() {
    console.debug('DialogMixin::handleCancel');

    this.refs.dialog.dismiss();
    if (typeof this.refs.dialog.props.onDismiss !== 'function') {
      this.resetDialogState();
    }
  },

  handleSuccessfullValidation() {
    console.debug('DialogMixin::handleSuccessfullValidation');

    if (this.hasEditMode()) {
      if (typeof this.handleEditSubmit === 'function') {
        this.handleEditSubmit();
      }
    } else if (typeof this.handleAddSubmit === 'function') {
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
