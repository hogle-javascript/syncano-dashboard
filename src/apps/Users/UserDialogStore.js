import Reflux from 'reflux';

// Utils & Mixins
import Mixins from '../../mixins';

//Stores & Actions
import UsersActions from './UsersActions';

var UserDialogStore = Reflux.createStore({
  listenables : UsersActions,

  mixins      : [
    Mixins.StoreForm,
    Mixins.DialogStore
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
    this.listenToForms();
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
