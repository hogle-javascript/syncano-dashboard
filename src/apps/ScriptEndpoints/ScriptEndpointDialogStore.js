import Reflux from 'reflux';

// Utils & Mixins
import {StoreFormMixin, DialogStoreMixin} from '../../mixins';

// Stores & Actions
import Actions from './ScriptEndpointsActions';
import ScriptsActions from '../Scripts/ScriptsActions';
import ScriptsStore from '../Scripts/ScriptsStore';

export default Reflux.createStore({
  listenables: Actions,
  mixins: [
    StoreFormMixin,
    DialogStoreMixin
  ],

  getInitialState() {
    return {
      label: '',
      signal: '',
      class: '',
      scripts: [
        {
          payload: '',
          text: 'Loading...'
        }
      ]
    };
  },

  init() {
    this.listenToForms();
    this.listenTo(ScriptsActions.setScripts, this.getScriptDropdown);
  },

  getScriptDropdown() {
    console.debug('DataViewDialogStore::getScriptDropdown');
    let scripts = ScriptsStore.getScriptsDropdown();

    if (scripts.length === 0) {
      scripts = [{payload: '', text: 'No Scripts, add one first'}];
    }
    this.trigger({scripts});
  },

  onCreateScriptEndpointCompleted() {
    console.debug('ScriptEndpointsDialogStore::onCreateScriptEndpointCompleted');
    this.dismissDialog();
    Actions.fetchScriptEndpoints();
  },

  onUpdateScriptEndpointCompleted() {
    console.debug('ScriptEndpointDialogStore::onUpdateScriptEndpointCompleted');
    this.dismissDialog();
    Actions.fetchScriptEndpoints();
  }
});
