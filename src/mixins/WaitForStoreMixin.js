export default {

  init() {
    this._shouldFetch = false;
    this._fetchCallback = null;
  },

  fetch() {
    console.debug('WaitForStoreMixin::fetch', this._shouldFetch);

    if (this._shouldFetch === false) {
      return this._shouldFetch = true;
    }

    if (this._fetchCallback !== null) {
      this._fetchCallback();
    }
  },

  waitFor() {
    console.debug('WaitForStoreMixin::waitFor');

    if (arguments.length < 2) {
      throw Error('At least two arguments are required: Action, Callback.');
    }

    let args = [].splice.call(arguments, 0);
    let callback = args.pop();
    let listenMethod = (args.length > 1) ? this.joinTrailing : this.listenTo;

    if (this.listenables) {
      let listenables = [].concat(this.listenables);
      for (let i = 0; i < listenables.length; i++) {
        let listenable = listenables[i];
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
