import Users from './Users';
import UsersStore from './UsersStore';
import UsersList from './UsersList';
import UsersActions from './UsersActions';
import UserDialog from './UserDialog';
import UserDialogStore from './UserDialogStore';

import GroupsActions from './GroupsActions';
import GroupsStore from './GroupsStore';
import GroupDialog from './GroupDialog';
import GroupDialogStore from './GroupDialogStore';
import GroupsList from './GroupsList';

Users.Actions = UsersActions;
Users.Store = UsersStore;
Users.List = UsersList;
Users.Dialog = UserDialog;
Users.DialogStore = UserDialogStore;
Users.Groups = {
  Actions: GroupsActions,
  Store: GroupsStore,
  Dialog: GroupDialog,
  DialogStore: GroupDialogStore,
  List: GroupsList
};

export default Users;
