import Reflux from 'reflux';

// Utils & Mixins
import Mixins from '../../mixins';

// Stores & Actions
import Actions from './ApiKeysActions';

export default Reflux.createStore({
  listenables: Actions,
  mixins: [
    Mixins.StoreForm,
    Mixins.DialogStore
  ],

  getInitialState() {
    // jscs:disable
    return {
      description: null,
      ignore_acl: false,
      allow_user_create: false
    };
    // jscs:enable
  },

  init() {
    this.listenToForms();
  },

  onCreateApiKeyCompleted() {
    console.debug('ApiKeyDialogStore::onCreateApiKeyCompleted');
    this.dismissDialog();
    Actions.fetchApiKeys();
  },

  onUpdateApiKeyCompleted() {
    console.debug('ApiKeyDialogStore::onUpdateApiKeyCompleted');
    this.dismissDialog();
    Actions.fetchApiKeys();
  }
});
