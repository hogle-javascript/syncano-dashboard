import Reflux from 'reflux';

// Utils & Mixins
import Mixins from '../../mixins';

// Stores & Actions
import TriggersActions from './TriggersActions';
import CodeBoxesActions from '../CodeBoxes/CodeBoxesActions';
import ClassesActions from '../Classes/ClassesActions';
import CodeBoxesStore from '../CodeBoxes/CodeBoxesStore';
import ClassesStore from '../Classes/ClassesStore';

export default Reflux.createStore({
  listenables: TriggersActions,
  mixins: [
    Mixins.StoreForm,
    Mixins.DialogStore
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
      codeboxes: [
        {payload: '', text: 'Loading...'}
      ]
    };
  },

  init() {
    this.listenToForms();
    this.joinTrailing(
      CodeBoxesActions.setCodeBoxes,
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
      codeboxes: CodeBoxesStore.getCodeBoxesDropdown(),
      classes: ClassesStore.getClassesDropdown()
    };

    if (dropdowns.codeboxes.length === 0) {
      dropdowns.codeboxes = [{payload: '', text: 'No codeboxes, add one first'}];
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
