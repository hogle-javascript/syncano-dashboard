import Reflux from 'reflux';

// Utils & Mixins
import {StoreFormMixin, DialogStoreMixin} from '../../mixins';

// Stores & Actions
import TriggersActions from './TriggersActions';
import ScriptsActions from '../Scripts/ScriptsActions';
import ClassesActions from '../Classes/ClassesActions';
import ScriptsStore from '../Scripts/ScriptsStore';
import ClassesStore from '../Classes/ClassesStore';

export default Reflux.createStore({
  listenables: TriggersActions,
  mixins: [
    StoreFormMixin,
    DialogStoreMixin
  ],

  signalMenuItems: [
    {
      payload: 'post_create',
      text: 'create'
    },
    {
      payload: 'post_update',
      text: 'update'
    },
    {
      payload: 'post_delete',
      text: 'delete'
    }
  ],

  getInitialState() {
    return {
      label: null,
      signal: '',
      class: '',
      classes: [
        {payload: '', text: 'Loading...'}
      ],
      scripts: [
        {payload: '', text: 'Loading...'}
      ]
    };
  },

  init() {
    this.listenToForms();
    this.joinTrailing(
      ScriptsActions.setScripts,
      ClassesActions.setClasses,
      this.getDropdowns
    );
  },

  getSignalsDropdown() {
    return this.signalMenuItems;
  },

  getDropdowns() {
    console.debug('TriggerDialogStore::getDropdowns');
    let dropdowns = {
      scripts: ScriptsStore.getScriptsDropdown(),
      classes: ClassesStore.getClassesDropdown()
    };

    if (dropdowns.scripts.length === 0) {
      dropdowns.scripts = [{payload: '', text: 'No Scripts, add one first'}];
    }

    if (dropdowns.classes.length === 0) {
      dropdowns.classes = [{payload: '', text: 'No classes, add one first'}];
    }

    this.trigger(dropdowns);
  },

  onCreateTriggerCompleted() {
    console.debug('TriggerDialogStore::onCreateTriggerCompleted');
    this.dismissDialog();
    TriggersActions.fetchTriggers();
  },

  onUpdateTriggerCompleted() {
    console.debug('TriggerDialogStore::onUpdateTriggerCompleted');
    this.dismissDialog();
    TriggersActions.fetchTriggers();
  }
});
