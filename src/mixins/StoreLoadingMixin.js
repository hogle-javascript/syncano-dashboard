var objectAssign = require('object-assign');

var StoreLoadingMixin = {

  setLoadingStates: function () {
    if (this.listenables){
      var arr = [].concat(this.listenables);
      arr.forEach(function(item) {
        this.setLoadingState(item);
      }.bind(this))
    }
  },

  setLoadingState: function (listenable) {
    for (var key in listenable) {
      var action = listenable[key];
      if (action.asyncResult === true && action.loading === true) {
        this.listenTo(action, this.setToLoading);
        this.listenTo(action.completed, this.setToNotLoading);
        this.listenTo(action.failure, this.setToNotLoading);
      }
    }
  },

  setToLoading: function () {
    this.data.isLoading = true;
    this.trigger(this.data);
  },

  setToNotLoading: function () {
    console.log('StoreLoadingMixin::setToNotLoading');
    this.data.isLoading = false;
    this.trigger(this.data);
  },

};

module.exports = StoreLoadingMixin;