import Reflux from 'reflux';

// Utils & Mixins
import Mixins from '../../mixins';

// Stores & Actions
import WebhooksActions   from './WebhooksActions';
import CodeBoxesActions  from '../CodeBoxes/CodeBoxesActions';
import CodeBoxesStore    from '../CodeBoxes/CodeBoxesStore';

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
      'class': '',
      codeboxes: [
        {
          payload: '',
          text: 'Loading...'
        }
      ]
    };
  },

  init() {
    this.listenToForms();
    this.listenTo(CodeBoxesActions.setCodeBoxes, this.getCodeBoxDropdown);
  },

  getCodeBoxDropdown() {
    console.debug('DataViewDialogStore::getCodeBoxDropdown');
    let codeboxes = CodeBoxesStore.getCodeBoxesDropdown();

    if (codeboxes.length === 0) {
      codeboxes = [{payload: '', text: 'No CodeBoxes, add one first'}];
    }
    this.trigger({codeboxes: codeboxes});
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
