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
    this.data.item = item;
    this.trigger(this.data);
  },

  onClearClickedItem() {
    console.debug('MenuStore::onClearClickedItem');
    this.data.item = null;
    this.trigger(this.data)
  },

  getClickedItem() {
    return this.data.item;
  }
})
