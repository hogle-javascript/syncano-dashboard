import _ from 'lodash';

export default {

  setLoadingStates() {
    if (this.listenables) {
      let listenables = [].concat(this.listenables);

      _.forEach(listenables, (listenable) => {
        this.bindLoadingListeners(listenable);
      });
    }
  },

  bindLoadingListeners(listenable) {
    _.forEach(listenable, (action, name) => {
      if (action.asyncResult === true && action.loading === true) {
        const hideDialogs = action.closingDialogs;
        const predicate = (n) => _.isFunction(this[n]);
        const trigger = {
          action: !_.some([name, _.camelCase(`on ${name}`)], predicate),
          completed: !_.some([_.camelCase(`on ${name} completed`), _.camelCase(`${name} completed`)], predicate),
          failure: !_.some([_.camelCase(`on ${name} failure`), _.camelCase(`${name} failure`)], predicate)
        };

        this.listenTo(action, () => this.setLoading(true, trigger.action));
        this.listenTo(action.completed, () => this.setLoading(false, trigger.completed, hideDialogs));
        this.listenTo(action.failure, () => this.setLoading(false, trigger.failure));
      }
    });
  },

  setLoading(state = true, trigger = true, hideDialogs = false) {
    if (this.data.isLoading === state) {
      return;
    }

    console.debug('StoreLoadingMixin::setLoading', state);
    this.data.isLoading = state;

    if (hideDialogs) {
      this.data.hideDialogs = true;
    }

    if (trigger) {
      this.trigger(this.data);
    }
  }

};
