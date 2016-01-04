import Reflux from 'reflux';

// Utils & Mixins
import Mixins from '../../mixins';

// Stores & Actions
import Actions from './RenameDialogActions';
import InstancesStore from './InstancesStore';


export default Reflux.createStore({
  listenables: Actions,
  mixins: [
    Mixins.StoreForm,
    Mixins.DialogStore
  ],

  getInitialState() {
    return {
      name: null,
      isLoading: false
    };
  },

  init() {
    this.listenToForms();
  },

  onRenameInstance() {
    this.trigger({isLoading: true});
  },

  onRenameInstanceCompleted() {
    InstancesStore.redirectToInstancesList();
  },

  onRenameInstanceFailure() {
    this.trigger({isLoading: false});
  }
});
