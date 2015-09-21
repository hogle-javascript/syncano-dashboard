import Reflux from 'reflux';

import Actions from './MenuActions';

export default Reflux.createStore({

  listenables: Actions,

  getInitialState() {
    return {
      item: null
    }
  },

  init() {
    this.data = this.getInitialState();
  },

  onSetItem(item) {
    console.debug('MenuStore::onSetItemId');
    this.data.item = item;
    this.trigger(this.data);
  }
})
