import Reflux from 'reflux';

// Utils & Mixins
import Mixins from '../../mixins';

// Stores & Actions
import WebhooksActions from './WebhooksActions';
import SnippetsActions from '../Snippets/SnippetsActions';
import SnippetsStore from '../Snippets/SnippetsStore';

export default Reflux.createStore({
  listenables: WebhooksActions,
  mixins: [
    Mixins.StoreForm,
    Mixins.DialogStore
  ],

  getInitialState() {
    return {
      label: '',
      signal: '',
      class: '',
      snippets: [
        {
          payload: '',
          text: 'Loading...'
        }
      ]
    };
  },

  init() {
    this.listenToForms();
    this.listenTo(SnippetsActions.setSnippets, this.getSnippetDropdown);
  },

  getSnippetDropdown() {
    console.debug('DataViewDialogStore::getSnippetDropdown');
    let snippets = SnippetsStore.getSnippetsDropdown();

    if (snippets.length === 0) {
      snippets = [{payload: '', text: 'No Snippets, add one first'}];
    }
    this.trigger({snippets});
  },

  onCreateWebhookCompleted() {
    console.debug('WebhookDialogStore::onCreateWebhookCompleted');
    this.dismissDialog();
    WebhooksActions.fetchWebhooks();
  },

  onUpdateWebhookCompleted() {
    console.debug('WebhookDialogStore::onUpdateWebhookCompleted');
    this.dismissDialog();
    WebhooksActions.fetchWebhooks();
  }
});
