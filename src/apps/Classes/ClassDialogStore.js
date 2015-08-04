import Reflux           from 'reflux';

// Utils & Mixins
import Mixins from '../../mixins';

//Stores & Actions
import Actions   from './ClassesActions';

export default Reflux.createStore({
  listenables: Actions,
  mixins: [
    Mixins.StoreForm,
    Mixins.DialogStore
  ],

  getInitialState() {
    return {
      description: null,
      name: null,
      fields: []
    };
  },

  init() {
    this.listenToForms();
  },

  onCreateClassCompleted() {
    console.debug('ClassDialogStore::onCreateClassCompleted');
    this.dismissDialog();
    Actions.fetchClasses();
  },

  onUpdateClassCompleted() {
    console.debug('ClassDialogStore::onUpdateClassCompleted');
    this.dismissDialog();
    Actions.fetchClasses();
  }
});
