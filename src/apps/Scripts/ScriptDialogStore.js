import Reflux from 'reflux';

// Utils & Mixins
import {StoreFormMixin, DialogStoreMixin} from '../../mixins';

// Stores & Actions
import SessionStore from '../Session/SessionStore';
import Actions from './ScriptsActions';

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

  setScriptRuntimes(payload) {
    let runtimes = Object.keys(payload).map((runtime) => {
      return {payload: runtime, text: runtime};
    });

    this.trigger({runtimes});
  },

  onCreateScriptCompleted(resp) {
    console.debug('ScriptsStore::onCreateScriptCompleted');
    this.dismissDialog();
    SessionStore.getRouter().transitionTo('script', {
      instanceName: SessionStore.getInstance().name,
      scriptId: resp.id
    });
  },

  onUpdateScriptCompleted() {
    console.debug('ScriptDialogStore::onUpdateScriptCompleted');
    this.dismissDialog();
    Actions.fetchScripts();
  },

  onFetchScriptRuntimesCompleted(runtimes) {
    console.debug('ScriptDialogStore::onFetchScriptRuntimesCompleted');
    Actions.setScriptRuntimes(runtimes);
  }
});
