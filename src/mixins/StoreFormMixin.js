
// TODO: add some options like: exclude, ignore, prefix etc
var StoreFormMixin = {
  getInitialState: function () {
    return this.data;
  },

  init: function () {
    this.data           = this.data || {};
    this.data.errors    = {};
    this.data.feedback  = null;
    this.data.canSubmit = true;
  },

  resetForm: function () {
    this.data.errors    = {};
    this.data.feedback  = null;
    this.data.canSubmit = true;
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
      if (action.asyncResult === true) {
        // TODO: add more checks
        this.listenTo(action, this.handleForm);
        this.listenTo(action.completed, this.handleFormCompleted);
        this.listenTo(action.failure, this.handleFormFailure);
      }
    }
  },

  handleForm: function () {
    this.data.canSubmit = false;
    this.trigger({canSubmit: this.data.canSubmit});
  },

  handleFormCompleted: function (payload) {
    this.resetForm();
  },

  handleFormFailure: function (payload) {
    this.resetForm();

    if (typeof payload === 'string') {
      this.data.errors.feedback = payload;
    } else {
      if (payload.non_field_errors !== undefined) {
        this.data.errors.feedback = payload.non_field_errors.join();
      }

      for (var field in payload) {
        this.data.errors[field] = payload[field];
      }
    }

    this.trigger({
      errors: this.data.errors,
      feedback: this.data.feedback,
      canSubmit: this.data.canSubmit
    });
  }
};

module.exports = StoreFormMixin;