var objectAssign = require('object-assign');

// TODO: add some options like: exclude, ignore, prefix etc
var StoreFormMixin = {

  getInitialFormState: function () {
    return {
      errors    : {},
      feedback  : null,
      canSubmit : true,
      hideDialogs: false // Non related field HACK!
    }
  },

  listenToForms: function () {
    if (this.listenables){
        var arr = [].concat(this.listenables);
        for(var i=0; i < arr.length; i++){
            this.listenToForm(arr[i]);
        }
    }
  },

  listenToForm: function (listenable) {
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

  handleForm: function () {
    this.trigger({canSubmit: false});
  },

  handleFormCompleted: function (payload) {
    console.log('StoreFormMixin::handleFormCompleted');
    this.trigger(this.getInitialFormState());
  },

  handleFormFailure: function (payload) {
    var state = objectAssign(this.data, this.getInitialFormState());

    if (typeof payload === 'string') {
      state.errors.feedback = payload;
    } else {
      if (payload.non_field_errors !== undefined) {
        state.errors.feedback = payload.non_field_errors.join();
      }

      for (var field in payload) {
        state.errors[field] = [].concat(payload[field]);
      }
    }

    for (var key in state) {
      if (state[key] === null || state[key] === undefined) {
        delete state[key];
      }
    }

    console.log('StoreFormMixin::handleFormFailure', state);
    this.trigger(state);
  }
};

module.exports = StoreFormMixin;