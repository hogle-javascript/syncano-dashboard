import Reflux from 'reflux';

// Utils & Mixins
import StoreFormMixin from '../../mixins/StoreFormMixin';
import DialogStoreMixin from '../../mixins/DialogStoreMixin';
import StoreLoadingMixin from '../../mixins/StoreLoadingMixin';

//Stores & Actions
import UsersActions from './UsersActions';

var UserDialogStore = Reflux.createStore({
  listenables : UsersActions,
  mixins      : [
    StoreFormMixin,
    DialogStoreMixin,
    StoreLoadingMixin
  ],

  getInitialState() {
    return {
      username  : null,
      password  : null,
      groups    : null,
      isLoading : false
    };
  },

  init() {
    this.data = this.getInitialState();
    this.listenToForms();
    this.setLoadingStates();
  },

  onCreateUserCompleted() {
    console.debug('UserDialogStore::onCreateUserCompleted');
    this.dismissDialog();
    UsersActions.fetchUsers();
  },

  onUpdateUserCompleted() {
    console.debug('UserDialogStore::onUpdateUserCompleted');
    this.dismissDialog();
    UsersActions.fetchUsers();
  }

});

module.exports = UserDialogStore;
