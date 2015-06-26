var objectAssign = require('object-assign');

// TODO: add some options like: exclude, ignore, prefix etc
var StoreFormMixin = {

  getInitialFormState: function() {
    return {
      errors    : {},
      feedback  : null,
      canSubmit : true,
      hideDialogs: false // Non related field HACK!
    }
  },

  listenToForms: function() {
    if (this.listenables) {
      var arr = [].concat(this.listenables);
      for (var i = 0; i < arr.length; i++) {
        this.listenToForm(arr[i]);
      }
    }
  },

  listenToForm: function(listenable) {
    for (var key in listenable) {
      var action = listenable[key];
      if (action.asyncResult === true && action.asyncForm === true) {
        // TODO: add more checks
        this.listenTo(action, this.handleForm);
        this.listenTo(action.completed, this.handleFormCompleted);
        this.listenTo(action.failure, this.handleFormFailure);
      }
    }
  },

  handleForm: function() {
    this.data.canSubmit = false;
    this.trigger(this.data);
  },

  handleFormCompleted: function(payload) {
    console.log('StoreFormMixin::handleFormCompleted');
    this.data = objectAssign(this.data, this.getInitialFormState())
    this.trigger(this.data);
  },

  handleFormFailure: function(payload) {
    console.log('StoreFormMixin::handleFormFailure');
    var state = objectAssign(this.data, this.getInitialFormState());

    if (typeof payload === 'string') {
      state.errors.feedback = payload;
    } else {
      // jscs:disable
      if (payload.non_field_errors !== undefined) {
        state.errors.feedback = payload.non_field_errors.join();
      }
      // jscs:enable

      for (var field in payload) {
        state.errors[field] = [].concat(payload[field]);
      }
    }

    for (var key in state) {
      if (state[key] === null || state[key] === undefined) {
        delete state[key];
      }
    }

    this.trigger(state);
  }
};

module.exports = StoreFormMixin;
