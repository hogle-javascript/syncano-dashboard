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

  onSetClickedItem(item) {
    console.debug('MenuStore::onSetClickedItem');
    this.trigger({item});
  },

  onClearClickedItem() {
    console.debug('MenuStore::onClearClickedItem');
    this.trigger({item: null})
  },

  getClickedItem() {
    return this.data.item;
  }
})
