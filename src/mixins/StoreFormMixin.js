let objectAssign = require('object-assign');

// TODO: add some options like: exclude, ignore, prefix etc
export default {

  getInitialFormState() {
    return {
      errors: {},
      feedback: null,
      canSubmit: true
    }
  },

  listenToForms() {
    if (this.listenables) {
      let arr = [].concat(this.listenables);

      for (let i = 0; i < arr.length; i++) {
        this.listenToForm(arr[i]);
      }
    }
  },

  listenToForm(listenable) {
    for (let key in listenable) {
      let action = listenable[key];

      if (action.asyncResult === true && action.asyncForm === true) {
        // TODO: add more checks
        this.listenTo(action, this.handleForm);
        this.listenTo(action.completed, this.handleFormCompleted);
        this.listenTo(action.failure, this.handleFormFailure);
      }
    }
  },

  handleForm() {
    console.log('StoreFormMixin::handleForm');
    this.trigger({canSubmit: false});
  },

  handleFormCompleted() {
    console.log('StoreFormMixin::handleFormCompleted');
    this.trigger(this.getInitialFormState());
  },

  handleFormFailure(payload) {
    console.log('StoreFormMixin::handleFormFailure');
    let state = this.getInitialFormState();

    if (typeof payload === 'string') {
      state.errors.feedback = payload;
    } else {
      if (payload.non_field_errors !== undefined) {
        state.errors.feedback = payload.non_field_errors.join(' ');
      }

      if (payload.__all__ !== undefined) {
        state.errors.feedback = payload.__all__.join(' ');
      }

      if (payload.message !== undefined) {
        state.errors.feedback = payload.message;
      }

      for (let field in payload) {
        state.errors[field] = [].concat(payload[field]);
      }
    }

    this.trigger(state);
  }
};
