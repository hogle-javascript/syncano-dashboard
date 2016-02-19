import Reflux from 'reflux';

// Utils & Mixins
import {StoreFormMixin, DialogStoreMixin} from '../../mixins';

// Stores & Actions
import SessionStore from '../Session/SessionStore';
import Actions from './SnippetsActions';

export default Reflux.createStore({
  listenables: Actions,
  mixins: [
    StoreFormMixin,
    DialogStoreMixin
  ],

  getInitialState() {
    return {
      label: null,
      runtime_name: '',
      runtimes: [
        {payload: '', text: 'Loading...'}
      ]
    };
  },

  init() {
    this.listenToForms();
  },

  setSnippetRuntimes(payload) {
    let runtimes = Object.keys(payload).map((runtime) => {
      return {payload: runtime, text: runtime};
    });

    this.trigger({runtimes});
  },

  onCreateSnippetCompleted(resp) {
    console.debug('SnippetsStore::onCreateSnippetCompleted');
    this.dismissDialog();
    SessionStore.getRouter().transitionTo('snippet', {
      instanceName: SessionStore.getInstance().name,
      snippetId: resp.id
    });
  },

  onUpdateSnippetCompleted() {
    console.debug('SnippetDialogStore::onUpdateSnippetCompleted');
    this.dismissDialog();
    Actions.fetchSnippets();
  },

  onFetchSnippetRuntimesCompleted(runtimes) {
    console.debug('SnippetDialogStore::onFetchSnippetRuntimesCompleted');
    Actions.setSnippetRuntimes(runtimes);
  }
});
