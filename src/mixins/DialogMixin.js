var DialogMixin = {

  componentWillUpdate: function(nextProps, nextState) {
    console.debug('DialogMixin::componentWillUpdate');

    if (this.state._dialogVisible === nextState._dialogVisible) {
      return;
    }

    if (nextState._dialogVisible === false) {
      return this.refs.dialog.dismiss();
    }

    if (nextState._dialogVisible === true) {
      return this.refs.dialog.show();
    }
  },

  handleCancel: function() {
    console.debug('DialogMixin::handleCancel');

    this.refs.dialog.dismiss();

    if (typeof this.getInitialState === 'function') {
      this.replaceState(this.getInitialState());
    }
  },

  handleSuccessfullValidation: function() {
    console.debug('DialogMixin::handleSuccessfullValidation');

    if (this.hasEditMode()) {
      if (typeof this.handleEditSubmit === 'function') {
        this.handleEditSubmit();
      }
    } else if (typeof this.handleAddSubmit === 'function') {
      this.handleAddSubmit();
    }

    this.replaceState(this.getInitialState());
  },

  hasEditMode: function() {
    return this.state._dialogMode === 'edit';
  },

  hasAddMode: function() {
    return this.state._dialogMode === 'add';
  }
};

module.exports = DialogMixin;
