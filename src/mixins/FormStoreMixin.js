var objectAssign = require('object-assign');


var FormStoreMixin = function (options) {
  var options = options         || {},
      key     = options.key     || 'data',
      prefix  = options.prefix  || null;

  return {

    getFormInitialState: function (storeInitialState) {
      return objectAssign(storeInitialState, {
        errors: {},
        canSubmit: true,
      });
    },

    init: function () {
      if (this[key] === undefined) {
        this[key] = {};
      }

      if (this[key].errors === undefined) {
        this[key].errors = {};
      }

      if (this[key].canSubmit === undefined) {
        this[key].canSubmit = true;
      }
    },

    onFormLoading: function () {
      this[key].canSubmit = false;
    },

    onFormLoadingAndTrigger: function () {
      this.onFormLoading();
      this.trigger(this[key]);
    },

    onFormCompleted: function () {
      this[key].errors    = {};
      this[key].canSubmit = true;
    },

    onFormFailure: function (payload) {
      if (typeof payload === 'string') {
        this[key].errors.feedback = payload;
      } else {
        for (var field in payload) {
          this[key].errors[field] = payload[field];
        }
      }
    },

   };
};

module.exports = FormStoreMixin;