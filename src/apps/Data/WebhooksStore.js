import Reflux from 'reflux';

// Utils & Mixins
import Mixins from '../../mixins';

// Stores & Actions
import ClassesActions from '../Classes/ClassesActions';
import CodeBoxesActions from '../CodeBoxes/CodeBoxesActions';
import SessionActions from '../Session/SessionActions';
import WebhooksActions from './WebhooksActions';

export default Reflux.createStore({
  listenables: WebhooksActions,
  mixins: [
    Mixins.CheckListStore,
    Mixins.WaitForStore
  ],

  getInitialState() {
    return {
      items: [],
      isLoading: true
    }
  },

  init() {
    this.data = this.getInitialState();
    this.waitFor(
      SessionActions.setUser,
      SessionActions.setInstance,
      this.refreshData
    );
  },

  setWebhooks(items) {
    this.data.items = Object.keys(items).map(item => items[item]);
    this.trigger(this.data);
  },

  getWebhooks(empty) {
    return this.data.items || empty || null;
  },

  refreshData() {
    WebhooksActions.fetchWebhooks();
  },

  onFetchWebhooks() {
    console.debug('WebhooksStore::onFetchWebhooks');
    this.data.isLoading = true;
    this.trigger(this.data);
  },

  onFetchWebhooksCompleted(items) {
    console.debug('WebhooksStore::onFetchWebhooksCompleted');
    this.data.isLoading = false;
    WebhooksActions.setWebhooks(items);
  },

  onRemoveWebhooksCompleted() {
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  }
});
