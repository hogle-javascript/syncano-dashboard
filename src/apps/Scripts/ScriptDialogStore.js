import Reflux from 'reflux';
import _ from 'lodash';

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
    const runtimesLabelMap = {
      golang: 'Golang',
      nodejs: 'NodeJS',
      'nodejs_library_v0.4': 'NodeJS (deprecated v0.4)',
      'nodejs_library_v1.0': 'NodeJS (latest v1.0)',
      php: 'PHP',
      python: 'Python',
      'python_library_v4.2': 'Python (deprecated v4.2)',
      'python_library_v5.0': 'Python (latest v5.0)',
      ruby: 'Ruby',
      swift: 'Swift'
    };
    const runtimes = _.sortBy(_.map(payload, (value, runtime) => {
      return {payload: runtime, text: runtimesLabelMap[runtime]};
    }), 'text');

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
