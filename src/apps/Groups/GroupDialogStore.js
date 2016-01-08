import Reflux from 'reflux';

// Utils & Mixins
import {StoreFormMixin, DialogStoreMixin, StoreLoadingMixin} from '../../mixins';

// Stores & Actions
import GroupsActions from './GroupsActions';

export default Reflux.createStore({
  listenables: GroupsActions,

  mixins: [
    StoreFormMixin,
    DialogStoreMixin,
    StoreLoadingMixin
  ],

  getInitialState() {
    return {
      isLoading: false,
      label: null
    };
  },

  init() {
    this.listenToForms();
  },

  onCreateGroupCompleted() {
    console.debug('GroupDialogStore::onCreateGroupCompleted');
    this.dismissDialog();
    GroupsActions.fetchGroups();
  },

  onUpdateGroupCompleted() {
    console.debug('GroupDialogStore::onUpdateGroupCompleted');
    this.dismissDialog();
    GroupsActions.fetchGroups();
  }
});
