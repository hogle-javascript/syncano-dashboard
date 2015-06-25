var WaitForStoreMixin = {

  init: function () {
    this._shouldFetch   = false;
    this._fetchCallback = null;
  },

  fetch: function () {
    console.debug('WaitForStoreMixin::fetch', this._shouldFetch);

    if (this._shouldFetch === false) {
      return this._shouldFetch = true;
    }

    if (this._fetchCallback !== null) {
      this._fetchCallback();
    }
  },

  waitFor: function () {
    console.debug('WaitForStoreMixin::waitFor');

    if (arguments.length < 2) {
      throw Error('At least two arguments are required: Action, Callback.');
    }

    var args         = [].splice.call(arguments, 0),
        callback     = args.pop(),
        listenMethod = (args.length > 1) ? this.joinTrailing: this.listenTo;

    if (this.listenables){
        var listenables = [].concat(this.listenables);
        for(var i=0; i < listenables.length; i++){
            var listenable = listenables[i];
            if (listenable.fetch !== undefined) {
              args.push(listenable.fetch);
            }
        }
    }

    this._fetchCallback = callback;
    args.push(this.fetch);
    listenMethod.apply(this, args);
  }

};

module.exports = WaitForStoreMixin;