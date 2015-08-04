import Reflux from 'reflux';

// Utils & Mixins
import Mixins from '../../mixins';

//Stores & Actions
import SessionStore from '../Session/SessionStore';
import Actions from './CodeBoxesActions';

export default Reflux.createStore({
  listenables: Actions,
  mixins: [
    Mixins.StoreForm,
    Mixins.DialogStore
  ],

  getInitialState() {
    // jscs:disable
    return {
      label: null,
      description: null,
      runtime_name: '',
      runtimes: [
        {payload: '', text: 'Loading...'}
      ]
    };
    // jscs:enable
  },

  init() {
    this.listenToForms();
  },

  setCodeBoxRuntimes(payload) {
    let runtimes = Object.keys(payload).map(runtime => {
      return {payload: runtime, text: runtime};
    });
    this.trigger({runtimes: runtimes});
  },

  onCreateCodeBoxCompleted(resp) {
    console.debug('CodeBoxesStore::onCreateCodeBoxCompleted');
    this.dismissDialog();
    SessionStore.getRouter().transitionTo('codebox-edit', {
      instanceName: SessionStore.getInstance().name,
      codeboxId: resp.id
    });
  },

  onUpdateCodeBoxCompleted() {
    console.debug('CodeBoxDialogStore::onUpdateCodeBoxCompleted');
    this.dismissDialog();
    Actions.fetchCodeBoxes();
  },

  onFetchCodeBoxRuntimesCompleted(runtimes) {
    console.debug('CodeBoxDialogStore::onFetchCodeBoxRuntimesCompleted');
    Actions.setCodeBoxRuntimes(runtimes);
  }
});
