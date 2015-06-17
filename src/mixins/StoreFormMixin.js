
var StoreFormMixin = {
  getInitialState: function () {
    return this.data;
  },

  init: function () {
    this.data           = this.data || {};
    this.data.errors    = {};
    this.data.feedback  = null;
  },

  handleFormCompleted: function (payload) {

  },

  handleFormFailure: function (payload) {

  }
};

module.exports = StoreFormMixin;