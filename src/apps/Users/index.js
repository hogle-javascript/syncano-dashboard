import Users from './Users.react';
import UsersStore from './UsersStore';
import UsersList from './UsersList.react';
import UsersActions from './UsersActions';
import UserDialog from './UserDialog.react';
import UserDialogStore from './UserDialogStore';

import GroupsActions from './GroupsActions';
import GroupsStore from './GroupsStore';
import GroupDialog from './GroupDialog.react';
import GroupDialogStore from './GroupDialogStore';
import GroupsList from './GroupsList.react';

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
