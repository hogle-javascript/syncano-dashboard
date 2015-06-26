var DialogMixin = {

  componentWillUpdate: function (nextProps, nextState) {
    console.debug('DialogMixin::componentWillUpdate');

    if (nextState.visible === false) {
      this.refs.dialog.dismiss();
    } else if (nextState.visible === true) {
      this.refs.dialog.show();
    }
  },

  handleCancel: function () {
    console.debug('DialogMixin::handleCancel');

    this.refs.dialog.dismiss();

    if (typeof this.getInitialState === 'function') {
      this.replaceState(this.getInitialState());
    }
  },

  handleSuccessfullValidation: function () {
    console.debug('DialogMixin::handleSuccessfullValidation');

    if (this.hasEditMode()) {
      if (typeof this.handleEditSubmit === 'function') {
        this.handleEditSubmit();
      }
    } else if (typeof this.handleAddSubmit === 'function') {
      this.handleAddSubmit();
    }
  },

  hasEditMode: function () {
    return this.state.mode === 'edit';
  },

  hasAddMode: function () {
    return this.state.mode === 'add';
  }
};

module.exports = DialogMixin;